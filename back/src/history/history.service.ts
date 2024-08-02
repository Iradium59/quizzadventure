import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import History from "database/models/history.model";

@Injectable()
export class HistoryService {
    constructor(@InjectModel(History) private readonly historyModel: typeof History) {}

    async FindAll(): Promise<History[]> {
        return this.historyModel.findAll();
    }

    async create(history: Partial<History>): Promise<History> {
        return this.historyModel.create(history);
    }

    async findOne(id: number): Promise<History> {
        return this.historyModel.findByPk(id);
    }

    async findByUser(name: string): Promise<History[]> {
        return this.historyModel.findAll({where: {user: name}});
    }

    async findEndingByUser(name: string): Promise<History> {
        return this.historyModel.findOne({where: {user: name, state: 'ENDING'}});
    }

    async findLastByUser(name: string): Promise<History> {
        return this.historyModel.findOne({where: {user: name}, order: [['createdAt', 'DESC']]});
    }

    async FindEnding(): Promise<History[]> {
        return this.historyModel.findAll({where: {state: 'ENDING'}});
    }

}