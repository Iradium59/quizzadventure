import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Question from '../../database/models/question.model';
import Answer from '../../database/models/answer.model';
import Categorie from '../../database/models/categorie.model';
import { QuestionSeeder } from './question-seeder';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Question, Categorie, Answer]),
  ],
  providers: [QuestionSeeder],
  exports: [QuestionSeeder],
})
export class SeederModule {}
