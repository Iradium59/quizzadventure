import { Controller, Get } from "@nestjs/common";
import { CategorieService } from "./categories.service";
import Categorie from "database/models/categorie.model";

@Controller('categories')
export class CategorieController {
    constructor(private readonly categorieService: CategorieService) {}

    @Get()
    getCategories(): Promise<Categorie[]> {
        return this.categorieService.FindAll();
    }
}

