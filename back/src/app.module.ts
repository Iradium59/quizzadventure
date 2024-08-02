import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'database/database.module';
import { QuestionModule } from './questions/questions.module';
import { CategorieModule } from './categories/categories.module';
import { HistoryModule } from './history/history.module';
import { AnswersModule } from './answers/answers.module';


@Module({
  imports: [DatabaseModule, QuestionModule, CategorieModule, HistoryModule, AnswersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
