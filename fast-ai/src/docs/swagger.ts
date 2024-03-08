import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createDocument(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('NestJS Fast GPT API')
    .setDescription('NestJS Fast GPT API description')
    .setVersion('1.0')
    .addTag('FastGPT')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
}
