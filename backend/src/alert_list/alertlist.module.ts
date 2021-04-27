import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AlertList, AlertListSchema } from "./schemas/alertList.schema";
import { AlertListController } from "./alertList.controller";
import { AlertListRepository } from "./alertList.repository";
import { AlertListService } from "./alertList.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: AlertList.name, schema: AlertListSchema }])],
    controllers: [AlertListController],
    providers: [AlertListService, AlertListRepository]
})
export class AlertListModule {}