import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Rest Series - SIS257')
    .setDescription('API Rest de la materia Desarrollo de Aplicación Int/Internet II')
    .setVersion('1.0')
    // .addTag('series')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, documentFactory);

  await app.listen(process.env.PORT ?? '');
  console.log(`App corriendo en ${await app.getUrl()}/apidoc`);
}
void bootstrap();
