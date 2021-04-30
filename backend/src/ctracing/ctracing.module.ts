import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { c_tracing, CtracingSchema } from "./schemas/ctracing.schema";
import { CtracingController } from "./ctracing.controller";
import { CtracingRepository } from "./ctracing.repository";
import { CtracingService } from "./ctracing.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: c_tracing.name, schema: CtracingSchema }])],
    controllers: [CtracingController],
    providers: [CtracingService, CtracingRepository]
})
export class CtracingModule {}