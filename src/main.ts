import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    methods: 'GET, POST, PUT, DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
    credentials: true, // Enable credentials (if using cookies or authorization headers)
  });

  await app.listen(3001);
}
bootstrap();
