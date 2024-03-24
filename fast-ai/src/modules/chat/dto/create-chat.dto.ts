import { Length } from 'class-validator';

export class CreateChatDto {
  @Length(2, 20)
  name: string;

  apiKeyId: number;
}
