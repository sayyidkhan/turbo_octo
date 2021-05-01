import { Injectable } from "@nestjs/common";
// import { v4 as uuidv4 } from 'uuid';
// import { UpdateAlertListDto } from "./dto/update-user.dto";

import { Location } from "./schemas/location.schema";
import { LocationRepository } from "./location.repository";

@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepository) {}

    async getLocationById(locationId: number): Promise<Location> {
        return this.locationRepository.findOne({ location_id : locationId })
    }

    async getAllLocation(): Promise<Location[]> {
        return this.locationRepository.find({});
    }

    async createNewLocation(locationId: number, locationName: string, district : string): Promise<Location> {
        return this.locationRepository.create({
            location_id : locationId,
            location_name : locationName,
            district : district
        });
    }

    // async updateEnterpriseUser(userId: string, userUpdates: UpdateAlertListDto): Promise<Location> {
    //     return this.locationRepository.findOneAndUpdate({ userId }, userUpdates);
    // }
}