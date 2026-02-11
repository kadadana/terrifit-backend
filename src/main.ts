import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Api-Version',
    defaultVersion: '1',
  })
}
bootstrap();

//to run the app: npm run start:dev