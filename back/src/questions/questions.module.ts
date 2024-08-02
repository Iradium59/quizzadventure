import { Module } from "@nestjs/common";
import { QuestionController } from "./questions.controller";
import { QuestionService } from "./questions.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Question from "database/models/question.model";


@Module({
    imports: [ SequelizeModule.forFeature([Question])],
    providers: [QuestionService],
    controllers: [QuestionController],
})
export class QuestionModule {}