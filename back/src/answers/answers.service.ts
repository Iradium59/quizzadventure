import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Answer from "database/models/answer.model";

@Injectable()
export class AnswersService {
    constructor(@InjectModel(Answer) private readonly answerModel: typeof Answer) {}

    async FindAll(): Promise<Answer[]> {
        return this.answerModel.findAll();
    }

    async create(answer: Partial<Answer>): Promise<Answer> {
        return this.answerModel.create(answer);
    }

    async findOne(id: number): Promise<Answer> {
        return this.answerModel.findByPk(id);
    }

    async findByQuestion(questionId: number): Promise<Answer[]> {
        return this.answerModel.findAll({where: {questionId: questionId}});
    }
}