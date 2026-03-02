import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      secure: false, // true para porta 465, false para outras portas,
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendAttendanceEmail(name?: string, phone?: string, attending?: boolean, adults?: number, children?: number) {
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

    return this.transporter.sendMail({
      from: this.configService.get<string>('EMAIL_FROM'),
      to: this.configService.get<string>('ORGANIZER_EMAIL'),
      subject,
      text,
      html,
    });
  }
}