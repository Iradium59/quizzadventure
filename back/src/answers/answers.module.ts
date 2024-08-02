import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Answer from 'database/models/answer.model';

@Module({
    imports: [ SequelizeModule.forFeature([Answer])],
    providers: [AnswersService],
    controllers: [AnswersController],
})
export class AnswersModule {}