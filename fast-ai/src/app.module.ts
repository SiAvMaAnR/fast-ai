import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AiCommunicatorModule } from './ai-communicator/ai-communicator.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { ChatModule } from './chat/chat.module';
import configuration from './common/common.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ApiKeysModule,
    ChatModule,
    AiCommunicatorModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.name'),
        entities: [__dirname + '/../**/models/*.model.{js,ts}'],
        synchronize: true,
        autoLoadEntities: true,
        migrationsRun: true,
        logging: false,
      }),
    }),
  ],
})
export class AppModule {}
