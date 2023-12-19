import { Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

@Injectable()
export class AppService {
  async bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('BFF')
      .setDescription('BFF')
      .setVersion('1.0')
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
  }
}
