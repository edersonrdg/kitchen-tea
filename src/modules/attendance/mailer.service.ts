import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    // Configurar SendGrid API Key
    const sendGridApiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (sendGridApiKey) {
      sgMail.setApiKey(sendGridApiKey);
    }
  }

  async sendAttendanceEmail(name?: string, phone?: string, attending?: boolean, adults?: number, children?: number): Promise<any> {
    const isAttending = attending === true;
    const subject = isAttending ? `Confirmação de Presença: ${name}` : `Confirmação de Ausência: ${name}`;
    const text = isAttending
      ? `${name} confirmou presença com o telefone ${phone}. Adultos: ${adults}, Crianças: ${children}`
      : `${name} confirmou que não poderá comparecer com o telefone ${phone}.`;

    let html = `
      <h2>${isAttending ? 'Nova Confirmação de Presença' : 'Nova Confirmação de Ausência'}</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Telefone:</strong> <a href="https://wa.me/${phone}">${phone}</a></p>
      <p><strong>Comparecerá:</strong> ${isAttending ? 'Sim' : 'Não'}</p>
    `;

    if (isAttending) {
      html += `
        <p><strong>Adultos acompanhantes:</strong> ${adults}</p>
        <p><strong>Crianças acompanhantes:</strong> ${children}</p>
      `;
    }

    html += `
      <p><em>Confirmação recebida em ${new Date().toLocaleString('pt-BR')}</em></p>
    `;

    const from = this.configService.get<string>('EMAIL_FROM')
    const to = this.configService.get<string>('ORGANIZER_EMAIL')

    if (!from || !to) {
      throw new Error('EMAIL_FROM and ORGANIZER_EMAIL must be set in the environment variables');
    }

    console.debug('Sending email with SendGrid:', { from, to, subject });

    try {
      const emailData = {
        to,
        from,
        subject,
        text,
        html,
      };

      const result = await sgMail.send(emailData);
      console.log('✅ Email enviado com sucesso via SendGrid:', result[0].statusCode);
      return result;
    } catch (error) {
      console.error('❌ Erro ao enviar email via SendGrid:', error.response?.body || error.message);
    }
  }
}