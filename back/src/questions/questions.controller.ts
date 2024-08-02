import { Controller, Get } from "@nestjs/common";
import { QuestionService } from "./questions.service";
import Question from "database/models/question.model";


@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Get()
    getQuestions(): Promise<Question[]> {
        return this.questionService.FindAll();
    }
}

