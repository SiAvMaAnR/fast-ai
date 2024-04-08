import { BadRequestException, UnauthorizedException } from '@nestjs/common';

class FailedToRefreshTokenError extends BadRequestException {
  constructor() {
    super('Failed to refresh token');
  }
}

class FailedToRevokeTokenError extends BadRequestException {
  constructor() {
    super('Failed to revoke token');
  }
}

class TokenIsNotValidError extends BadRequestException {
  constructor() {
    super('Token is not valid');
  }
}

class InvalidCredentialsError extends UnauthorizedException {
  constructor() {
    super('Invalid credentials');
  }
}

export {
  FailedToRefreshTokenError,
  FailedToRevokeTokenError,
  TokenIsNotValidError,
  InvalidCredentialsError,
};
