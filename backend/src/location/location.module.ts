import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Location, LocationSchema } from "./schemas/location.schema";
import { LocationController } from "./location.controller";
import { LocationRepository } from "./location.repository";
import { LocationService } from "./location.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])],
    controllers: [LocationController],
    providers: [LocationService , LocationRepository],
    exports: [LocationService, LocationRepository]
})
export class LocationModule {}