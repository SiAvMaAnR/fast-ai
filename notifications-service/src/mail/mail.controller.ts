import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendConfirmationDto } from './dto/send-confirmation.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('send_confirmation')
  async handleSendConfirmation(@Payload() data: SendConfirmationDto) {
    const { username, email, token } = data;

    await this.mailService.sendConfirmation({
      username,
      email,
      token,
    });
  }
}
