import { IsEmail } from 'class-validator';

export class SendMessageDto {
  @IsEmail()
  email: string;
  username: string;
  token: string;
}
