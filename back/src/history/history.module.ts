import { Module } from "@nestjs/common";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";
import { SequelizeModule } from "@nestjs/sequelize";
import History from "database/models/history.model";

@Module({
    imports: [ SequelizeModule.forFeature([History])],
    providers: [HistoryService],
    controllers: [HistoryController],
})
export class HistoryModule {}