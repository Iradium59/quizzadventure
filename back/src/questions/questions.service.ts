import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Question from "database/models/question.model";

@Injectable()
export class QuestionService {
    constructor(@InjectModel(Question) private readonly questionModel: typeof Question) {}

    async FindAll(): Promise<Question[]> {
        return this.questionModel.findAll();
    }

    async create(question: Partial<Question>): Promise<Question> {
        return this.questionModel.create(question);
    }

    async findOne(id: number): Promise<Question> {
        return this.questionModel.findByPk(id);
    }
}