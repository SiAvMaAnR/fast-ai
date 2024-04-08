import { IsEmail } from 'class-validator';

export class SendConfirmationDto {
  @IsEmail()
  email: string;
  username: string;
  token: string;
}
