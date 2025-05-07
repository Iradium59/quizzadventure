import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { QuestionSeeder } from './question-seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule, {
    logger: ['error', 'warn']
  });
  
  try {
    const seeder = app.get(QuestionSeeder);
    await seeder.seed();
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
