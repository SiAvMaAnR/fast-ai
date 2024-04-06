import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppConfig } from './common/common.config';
import { createDocument } from './common/common.docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const logger = new Logger(NestApplication.name);
  const configService = app.get<ConfigService>(ConfigService);
  const { port } = configService.get<AppConfig>('app');

  createDocument(app);

  await app
    .listen(port)
    .then(() => logger.log(`Server is running on port: ${port}`));
}
bootstrap();
