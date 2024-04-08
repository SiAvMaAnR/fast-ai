import { BadRequestException } from '@nestjs/common';

class ChatNotFoundError extends BadRequestException {
  constructor() {
    super('Chat not found');
  }
}

export { ChatNotFoundError };
