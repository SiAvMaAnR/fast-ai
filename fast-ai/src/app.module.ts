import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AiCoreModule } from './modules/ai-core/ai-core.module';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ApiKeysModule,
    ChatModule,
    AiCoreModule,
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
