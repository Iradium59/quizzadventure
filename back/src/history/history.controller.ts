import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { HistoryService } from "./history.service";
import History from "database/models/history.model";

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get()
    getHistory(): Promise<History[]> {
        return this.historyService.FindAll();
    }

    @Post()
    createHistory(@Body() history: Partial<History>): Promise<History> {
        return this.historyService.create(history);
    }

    @Get('user/:name')
    getHistoryByUser(@Param('name') name: string): Promise<History[]> {
        return this.historyService.findByUser(name);
    }

    @Get('ending/user/:name')
    getEndingHistoryByUser(@Param('name') name: string): Promise<History> {
        return this.historyService.findEndingByUser(name);
    }
}