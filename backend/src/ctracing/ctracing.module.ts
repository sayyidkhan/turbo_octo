import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {c_tracing, CtracingSchema} from "./schemas/ctracing.schema";
import {CtracingController} from "./ctracing.controller";
import {CtracingRepository} from "./ctracing.repository";
import {CtracingService} from "./ctracing.service";
import {P_UserModule} from "../p_user/p_user.module";
import {LocationModule} from "../location/location.module";

@Module({
    imports: [MongooseModule.forFeature([
        { name: c_tracing.name, schema: CtracingSchema }]),
        P_UserModule,
        LocationModule,
    ],
    controllers: [CtracingController],
    providers: [CtracingService, CtracingRepository]
})
export class CtracingModule {}