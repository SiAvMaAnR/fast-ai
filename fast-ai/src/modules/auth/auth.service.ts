import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppAuthConfig } from 'src/config/configuration';
import * as argon from 'argon2';
import { ConfirmRegDto } from './dto/confirm-reg.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private client: ClientProxy,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findOneByEmail(email);

    const isVerify = await argon.verify(user.passwordHash, password);

    if (!isVerify) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const authConfig = this.configService.get<AppAuthConfig>('app.auth');

    const userPayload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(userPayload, {
        expiresIn: authConfig.accessToken.expiresIn,
        secret: authConfig.accessToken.secret,
      }),
      this.jwtService.signAsync(userPayload, {
        expiresIn: authConfig.accessToken.expiresIn,
        secret: authConfig.accessToken.secret,
      }),
    ]);

    const refreshTokenHash = await argon.hash(refreshToken);

    await this.usersService.update(user.id, {
      refreshToken: refreshTokenHash,
    });

    return { accessToken, refreshToken };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, login, password } = signUpDto;
    const sameUser = await this.usersService.findOneByEmail(email);

    if (sameUser) {
      throw new Error('Same user already exists');
    }

    const token = '1234';

    this.client.emit('send_message', {
      email,
      username: login,
      token,
    });
  }

  async confirmReg(confirmRegDto: ConfirmRegDto) {
    const { token } = confirmRegDto;
    console.log(confirmRegDto);

    // const passwordHash = await argon.hash(password);

    // await this.usersService.create({
    //   email,
    //   login,
    //   passwordHash,
    // });
  }
}
