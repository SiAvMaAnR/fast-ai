import { BadRequestException } from '@nestjs/common';

class RecordNotFoundError extends BadRequestException {
  constructor(reason: string) {
    super(`Record not found (${reason})`);
  }
}

export { RecordNotFoundError };
