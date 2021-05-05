import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {AlertList, AlertListSchema} from "./schemas/alertList.schema";
import {AlertListController} from "./alertList.controller";
import {AlertListRepository} from "./alertList.repository";
import {AlertListService} from "./alertList.service";
import {LocationModule} from "../location/location.module";
import {CompositeAlertListService} from "./compositeAlertList.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AlertList.name, schema: AlertListSchema }]),
        LocationModule,
    ],
    controllers: [AlertListController],
    providers: [AlertListService, CompositeAlertListService, AlertListRepository,]
})
export class AlertListModule {}