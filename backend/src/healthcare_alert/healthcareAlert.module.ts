import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthcareAlert, HealthcareAlertSchema } from "./schemas/healthcareAlert.schema";
import { HealthcareAlertController } from "./healthcareAlert.controller";
import { HealthCareAlertRepository } from "./healthcareAlert.repository";
import { HealthcareAlertService } from "./healthcareAlert.service";
import {E_UserModule} from "../e_user/e_User.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: HealthcareAlert.name, schema: HealthcareAlertSchema }]),
        E_UserModule,
    ],
    controllers: [HealthcareAlertController],
    providers: [HealthcareAlertService, HealthCareAlertRepository]
})
export class HealthcareAlertModule {}