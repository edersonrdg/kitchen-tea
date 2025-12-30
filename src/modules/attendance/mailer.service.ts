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

  sendConfirmationEmail(name?: string, email?: string) {
    return this.transporter.sendMail({
      from: this.configService.get<string>('EMAIL_FROM'),
      to: this.configService.get<string>('ORGANIZER_EMAIL'),
      subject: `Confirmação de Presença: ${name}`,
      text: `${name} confirmou presença com o email ${email}`,
      html: `
        <h2>Nova Confirmação de Presença</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><em>Confirmação recebida em ${new Date().toLocaleString('pt-BR')}</em></p>
      `,
    });
  }
}
