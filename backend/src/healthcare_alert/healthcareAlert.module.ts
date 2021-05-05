import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthcareAlert, HealthcareAlertSchema } from "./schemas/healthcareAlert.schema";
import { HealthcareAlertController } from "./healthcareAlert.controller";
import { HealthCareAlertRepository } from "./healthcareAlert.repository";
import { HealthcareAlertService } from "./healthcareAlert.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: HealthcareAlert.name, schema: HealthcareAlertSchema }])],
    controllers: [HealthcareAlertController],
    providers: [HealthcareAlertService, HealthCareAlertRepository]
})
export class VaccineModule {}