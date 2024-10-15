import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts listening for shutdown hooks (For MikroORM etc)
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
