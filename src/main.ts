import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import MongoHelper from './utils/MongoHelper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await MongoHelper.connect('mongodb://localhost/nestjs');

  await app.listen(3000);
}
bootstrap();
