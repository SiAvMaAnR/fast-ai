import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { ConfirmRegDto } from './dto/confirm-reg.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpDto } from './dto/sign-up.dto';
import { UserPayloadT } from './auth.types';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RevokeTokenDto } from './dto/revoke-token.dto';
import {
  FailedToRefreshTokenError,
  FailedToRevokeTokenError,
  InvalidCredentialsError,
  TokenIsNotValidError,
} from './auth.errors';
import { UserAlreadyExistsError } from '../users/users.errors';
import { AppAuthConfig, AppAuthTokenConfig } from 'src/common/common.config';

@Injectable()
export class AuthService {
  private readonly authConfig: AppAuthConfig;

  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private client: ClientProxy,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.authConfig = this.configService.get<AppAuthConfig>('app.auth');
  }

  async createToken(
    userPayload: UserPayloadT,
    tokenConfig: AppAuthTokenConfig,
  ) {
    const result = this.jwtService.signAsync(userPayload, {
      expiresIn: tokenConfig.expiresIn,
      secret: tokenConfig.secret,
    });

    return result;
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findOneByEmail(email);

    const isVerify = await argon.verify(user.passwordHash, password);

    if (!isVerify) {
      throw new InvalidCredentialsError();
    }

    const userPayload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.createToken(userPayload, this.authConfig.accessToken),
      this.createToken(userPayload, this.authConfig.refreshToken),
    ]);

    const refreshTokenHash = await argon.hash(refreshToken);

    await this.usersService.update(user.id, {
      refreshToken: refreshTokenHash,
    });

    return { accessToken, refreshToken };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, login } = signUpDto;
    const sameUser = await this.usersService.findOneByEmail(email);

    if (sameUser) {
      throw new UserAlreadyExistsError();
    }

    const token = await this.jwtService.signAsync(
      { email, login },
      {
        expiresIn: this.authConfig.accessToken.expiresIn,
        secret: this.authConfig.accessToken.secret,
      },
    );

    this.client.emit('send_confirmation', {
      email,
      username: login,
      token,
    });
  }

  async confirmReg(confirmRegDto: ConfirmRegDto) {
    const { token, password } = confirmRegDto;

    const verify = await this.jwtService.verifyAsync(token, {
      secret: this.authConfig.accessToken.secret,
    });

    if (!verify) {
      throw new TokenIsNotValidError();
    }

    const { login, email } = verify;

    const sameUser = await this.usersService.findOneByEmail(email);

    if (sameUser) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await argon.hash(password);

    await this.usersService.create({
      email,
      login,
      passwordHash,
    });
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.authConfig.refreshToken.secret,
      });

      const user = await this.usersService.findOneByEmail(verify.email);
      if (!user) {
        throw new Error('User is not found');
      }

      const isVerify = await argon.verify(user.refreshToken, refreshToken);

      if (!isVerify) {
        throw new Error('Failed to verify token');
      }

      const newAccessToken = await this.createToken(
        {
          sub: user.id,
          email: user.email,
        },
        this.authConfig.accessToken,
      );

      return newAccessToken;
    } catch {
      throw new FailedToRefreshTokenError();
    }
  }

  async revokeToken(revokeTokenDto: RevokeTokenDto) {
    const { refreshToken } = revokeTokenDto;

    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.authConfig.refreshToken.secret,
      });

      const user = await this.usersService.findOneByEmail(verify.email);

      if (!user) {
        throw new Error('User is not found');
      }

      await this.usersService.update(user.id, {
        refreshToken: null,
      });
    } catch {
      throw new FailedToRevokeTokenError();
    }
  }
}
