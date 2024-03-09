import { IsEmail, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @Length(4, 20)
  login: string;
}
