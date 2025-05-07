import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { QuestionSeeder } from './question-seeder';

@Injectable()
@Command({ name: 'seed', description: 'Seed the database with initial data' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly questionSeeder: QuestionSeeder) {
    super();
  }

  async run(): Promise<void> {
    try {
      console.log('Starting database seeding...');
      await this.questionSeeder.seed();
      console.log('Database seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
}
