import { BadRequestException } from '@nestjs/common';

class ApiKeyNotFoundError extends BadRequestException {
  constructor() {
    super('Api key not found');
  }
}

export { ApiKeyNotFoundError };
