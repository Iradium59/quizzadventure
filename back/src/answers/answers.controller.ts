import { Controller, Get, Param } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import Answer from "database/models/answer.model";


@Controller('answers')
export class AnswersController {
    constructor(private readonly answerService: AnswersService) {}

    @Get()
    getAnswers(): Promise<Answer[]> {
        return this.answerService.FindAll();
    }

    @Get('question/:id')
    getAnswersByQuestion(@Param('id') id: number): Promise<Answer[]> {
        console.log(id);
        return this.answerService.findByQuestion(id);
    }
}