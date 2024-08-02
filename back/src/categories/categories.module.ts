import { Module } from "@nestjs/common";
import { CategorieController } from "./categories.controller";
import { CategorieService } from "./categories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Categorie from "database/models/categorie.model";


@Module({
    imports: [ SequelizeModule.forFeature([Categorie])],
    providers: [CategorieService],
    controllers: [CategorieController],
})
export class CategorieModule {}