import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Categorie from "database/models/categorie.model";

@Injectable()
export class CategorieService {
    constructor(@InjectModel(Categorie) private readonly categorieModel: typeof Categorie) {}

    async FindAll(): Promise<Categorie[]> {
        return this.categorieModel.findAll();
    }

    async create(category: Partial<Categorie>): Promise<Categorie> {
        return this.categorieModel.create(category);
    }

    async findOne(id: number): Promise<Categorie> {
        return this.categorieModel.findByPk(id);
    }
}