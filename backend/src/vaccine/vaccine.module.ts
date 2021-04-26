import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { v_cert, VaccineSchema } from "./schemas/vaccine.schema";
import { VaccineController } from "./vaccine.controller";
import { VaccineRepository } from "./vaccine.repository";
import { VaccineService } from "./vaccine.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: v_cert.name, schema: VaccineSchema }])],
    controllers: [VaccineController],
    providers: [VaccineService, VaccineRepository]
})
export class VaccineModule {}