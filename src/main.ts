import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rootDirname = process.cwd();
  const swaggerSpec = await readFile(
    join(rootDirname, 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(swaggerSpec);
  SwaggerModule.setup('doc', app, document);

  const PORT = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(PORT);
}

bootstrap();
