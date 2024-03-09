import { Length } from 'class-validator';

export class ConfirmRegDto {
  token: string;

  @Length(6, 40)
  password: string;
}
