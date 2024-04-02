import { BadRequestException } from '@nestjs/common';

class UserAlreadyExistsError extends BadRequestException {
  constructor() {
    super('Same user already exists');
  }
}

export { UserAlreadyExistsError };
