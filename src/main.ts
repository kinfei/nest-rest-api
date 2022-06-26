import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as cors from 'cors';
import { AppModule } from './modules/app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';

// const exp = express();

// // Express middleware.
// exp.use(bodyParser.json());
// exp.use(bodyParser.urlencoded({ extended: false }));
// exp.use(cors());

async function bootstrap() {
  // const adapter = new ExpressAdapter(exp);
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Add a route prefix
  app.setGlobalPrefix('api');

  // Initialize swagger API
  const options = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription('Swagger API')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3010);
}
bootstrap();
