import {Injectable} from "@nestjs/common";
import {Location} from "./schemas/location.schema";
import {LocationRepository} from "./location.repository";

@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepository) {}

    async getLocationById(locationId: number): Promise<Location> {
        return this.locationRepository.findOne({ location_id : locationId })
    }

    async getAllLocation(): Promise<Location[]> {
        return this.locationRepository.find({});
    }

    async getAllLocationDict(): Promise<{}> {
        const locationList: Location[] = await this.getAllLocation();
        const myDict = {};
        locationList.forEach((location: Location) => {
            const locationId = location.location_id;
            const locationName = location.location_name;
            const district = location.district;
            const locationInterface = {locationId: locationId, location_name: locationName, district: district};
            myDict[locationId] = locationInterface;
        })
        return myDict;
    }

}