import { BadRequestException } from '@nestjs/common';

class RequestFailedError extends BadRequestException {
  constructor(model: string, reason?: string) {
    super(`Failed to complete request to ${model}, reason: ${reason}`);
  }
}

export { RequestFailedError };
