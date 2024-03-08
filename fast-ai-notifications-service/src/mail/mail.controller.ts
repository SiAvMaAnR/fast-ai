import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendMessageDto } from './dto/send-message.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('send_message')
  async handleSendMessage(@Payload() data: SendMessageDto) {
    const { username, email, token } = data;

    await this.mailService.sendConfirmation({
      username,
      email,
      token,
    });
  }
}
