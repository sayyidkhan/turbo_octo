import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { v_cert, VaccineSchema } from "./schemas/vaccine.schema";
import { VaccineController } from "./vaccine.controller";
import { VaccineRepository } from "./vaccine.repository";
import { VaccineService } from "./vaccine.service";
import {P_UserModule} from "../p_user/p_user.module";
import {E_UserModule} from "../e_user/e_User.module";
import {Vaccine_reportService} from "./vaccine_report.service";

@Module({
    imports: [MongooseModule.forFeature([
        { name: v_cert.name, schema: VaccineSchema }]),
        P_UserModule,
        E_UserModule,
    ],
    controllers: [VaccineController],
    providers: [
        VaccineService,
        Vaccine_reportService,
        VaccineRepository
    ]
})
export class VaccineModule {}