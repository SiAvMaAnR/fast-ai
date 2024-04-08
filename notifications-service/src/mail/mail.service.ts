import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfirmationArgs } from './mail.types';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmation(args: ConfirmationArgs) {
    const { token, username, email } = args;

    const subject = 'Welcome to FastAI! Confirm your Email';

    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './confirmation',
      context: {
        name: username,
        url,
      },
    });
  }
}
