import { Controller, Get, Param } from "@nestjs/common";
import { QuestionService } from "./questions.service";
import Question from "database/models/question.model";


@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Get()
    getQuestions(): Promise<Question[]> {
        return this.questionService.FindAll();
    }

    @Get('category/:category')
    getQuestionsByCategory(@Param('category') category: number): Promise<Question[]> {
        return this.questionService.FindByCategory(category);
    }

    @Get('limit/:limit')
    getQuestionsLimit(@Param('limit') limit: number): Promise<Question[]> {
        return this.questionService.findLimit(limit);
    }

    @Get('category/:category/limit/:limit')
    getQuestionsByCategoryAndLimit(@Param('category') category: number, @Param('limit') limit: number): Promise<Question[]> {
        return this.questionService.findByCategoryAndLimit(category, limit);
    }
}

