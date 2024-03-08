import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppConfig } from './config/configuration';
import { createDocument } from './docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get<ConfigService>(ConfigService);
  const { port } = configService.get<AppConfig>('app');

  createDocument(app);

  await app
    .listen(port)
    .then(() => Logger.log(`Server is running on port:${port}`));
}
bootstrap();