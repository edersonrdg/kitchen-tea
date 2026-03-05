import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import qrcode from 'qrcode-terminal';
import { Attendance } from '../attendance/schemas/attendance.schema';

@Injectable()
export class WhatsappService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(WhatsappService.name);
    private socket?: {
        ev: {
            on: (event: string, listener: (...args: unknown[]) => void) => void;
        };
        ws: { close: () => void };
        sendMessage: (jid: string, content: { text: string }) => Promise<unknown>;
        user?: { id?: string };
    };
    private disconnectLoggedOutCode?: number;
    private isConnected = false;

    constructor(private readonly configService: ConfigService) { }

    async onModuleInit(): Promise<void> {
        await this.start();
    }

    onModuleDestroy(): void {
        this.socket?.ws.close();
    }

    async notifyNewAttendance(attendance: Attendance): Promise<void> {
        const destinationJid = this.resolveSelfJid();
        if (!destinationJid) {
            this.logger.warn('Sessao WhatsApp sem JID proprio resolvido. Notificacao nao enviada.');
            return;
        }

        this.logger.debug(`Destino resolvido para notificacao: ${destinationJid}`);

        const message = this.buildNewAttendanceMessage(attendance);
        await this.sendWithRetry(destinationJid, message);
        this.logger.log(`Notificacao de attendance enviada para ${destinationJid}.`);
    }

    private async start(): Promise<void> {
        const baileys = await import('@whiskeysockets/baileys');
        const makeWASocket = baileys.default;
        const {
            Browsers,
            DisconnectReason,
            fetchLatestBaileysVersion,
            useMultiFileAuthState,
        } = baileys;

        this.disconnectLoggedOutCode = DisconnectReason.loggedOut;

        const authFolder =
            this.configService.get<string>('WHATSAPP_AUTH_FOLDER') ?? 'whatsapp-auth';

        const { state, saveCreds } = await useMultiFileAuthState(authFolder);
        const { version } = await fetchLatestBaileysVersion();

        const socket = makeWASocket({
            version,
            auth: state,
            browser: Browsers.ubuntu('KitchenTeaBot'),
            printQRInTerminal: false,
            markOnlineOnConnect: true,
            syncFullHistory: false,
        });
        this.socket = socket;

        socket.ev.on('creds.update', saveCreds);

        socket.ev.on('connection.update', (update: unknown) => {
            const typedUpdate = update as {
                connection?: string;
                lastDisconnect?: { error?: { output?: { statusCode?: number } } };
                qr?: string;
            };

            const { connection, lastDisconnect, qr } = typedUpdate;

            if (qr) {
                this.logger.log('Escaneie o QR abaixo para conectar o WhatsApp:');
                qrcode.generate(qr, { small: true });
            }

            if (connection === 'open') {
                this.isConnected = true;
                this.logger.log('WhatsApp conectado com sucesso.');
                const selfJid = this.resolveSelfJid();
                if (selfJid) {
                    this.logger.log(`Notificacoes serao enviadas apenas para o proprio numero: ${selfJid}`);
                }
            }

            if (connection === 'close') {
                this.isConnected = false;

                const statusCode = (lastDisconnect?.error as { output?: { statusCode?: number } })
                    ?.output?.statusCode;
                const shouldReconnect = statusCode !== this.disconnectLoggedOutCode;

                this.logger.warn(
                    `Conexao WhatsApp encerrada. status=${statusCode ?? 'desconhecido'}`,
                );

                if (shouldReconnect) {
                    setTimeout(() => {
                        void this.start();
                    }, 3000);
                } else {
                    this.logger.error(
                        'Sessao WhatsApp deslogada. Remova a pasta de auth e pareie novamente.',
                    );
                }
            }
        });
    }

    private buildNewAttendanceMessage(attendance: Attendance): string {
        const lines = [
            'Nova confirmacao de presenca recebida',
            '',
            `Nome: ${attendance.name ?? 'Sem nome'}`,
            `Telefone: ${attendance.phone ?? '-'}`,
            `Comparece: ${attendance.attending ? 'Sim' : 'Nao'}`,
            `Adultos: ${attendance.adults ?? 0}`,
            `Criancas: ${attendance.children ?? 0}`,
            `Data: ${new Date().toLocaleString('pt-BR')}`,
        ];

        return lines.join('\n');
    }

    private async sendWithRetry(jid: string, text: string): Promise<void> {
        const maxAttempts = 3;
        let lastError: unknown;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await this.sendMessage(jid, text);
                return;
            } catch (error) {
                lastError = error;
                this.logger.error(
                    `Falha ao enviar mensagem WhatsApp (tentativa ${attempt}/${maxAttempts})`,
                    error instanceof Error ? error.stack : String(error),
                );

                if (attempt < maxAttempts) {
                    await this.delay(1500 * attempt);
                }
            }
        }

        throw new Error(
            `Envio WhatsApp falhou para ${jid}: ${lastError instanceof Error ? lastError.message : String(lastError)
            }`,
        );
    }

    private async sendMessage(jid: string, text: string): Promise<void> {
        if (!this.socket || !this.isConnected) {
            throw new Error('WhatsApp nao esta conectado.');
        }

        this.logger.debug(`Tentando enviar mensagem para ${jid}: ${text}`);
        await this.socket.sendMessage(jid, { text });
    }

    private resolveSelfJid(): string | null {
        const rawSelfId = this.socket?.user?.id;
        const normalizedSelf = this.normalizePhone(rawSelfId);
        if (!normalizedSelf) {
            return null;
        }

        return `${normalizedSelf}@s.whatsapp.net`;
    }

    private normalizePhone(value?: string): string {
        if (!value) {
            return '';
        }

        return value
            .replace(/:[0-9]+@s\.whatsapp\.net$/, '')
            .replace(/@s\.whatsapp\.net$/, '')
            .replace(/@lid$/, '')
            .replace(/\D/g, '');
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
