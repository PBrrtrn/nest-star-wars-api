import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 4567;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
