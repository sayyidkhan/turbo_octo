import { Injectable } from "@nestjs/common";
// import { v4 as uuidv4 } from 'uuid';
// import { UpdateUserDto } from "./dto/update-user.dto";

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

    async createNewLocation(locationId: number, locationName: string): Promise<Location> {
        return this.locationRepository.create({
            location_id : locationId,
            location_name : locationName,
        });
    }

    // async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<Location> {
    //     return this.locationRepository.findOneAndUpdate({ userId }, userUpdates);
    // }
}