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

    async FindByCategory(category: number): Promise<Question[]> {
        return this.questionModel.findAll({ where: { category } });
    }

    async findLimit(limit: number): Promise<Question[]> {
        try {
            const allQuestions = await this.questionModel.findAll({
                order: this.questionModel.sequelize.random() 
            });

            return allQuestions.slice(0, limit);
        } catch (error) {
            console.error('Error finding random questions:', error);
            throw new Error('Error finding random questions');
        }
    }

    async findByCategoryAndLimit(category: number, limit: number): Promise<Question[]> {
        try {
            const allQuestions = await this.questionModel.findAll({
                where: { category },
                order: this.questionModel.sequelize.random() 
            });

            return allQuestions.slice(0, limit);
        } catch (error) {
            console.error('Error finding random questions by category:', error);
            throw new Error('Error finding random questions by category');
        }
    }
}