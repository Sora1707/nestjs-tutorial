import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = 3333;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // OpenAPI Swagger
    const config = new DocumentBuilder()
        .setTitle('Users example')
        .setDescription('The users API description')
        .setVersion('1.0')
        .addTag('users')
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            methodKey,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
}

bootstrap();
