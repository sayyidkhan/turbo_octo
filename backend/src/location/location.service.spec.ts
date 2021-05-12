import {LocationService} from "./location.service";
import {Test, TestingModule} from "@nestjs/testing";
import {Location} from "./schemas/location.schema";
import {LocationModule} from "./location.module";
import {AppModule} from "../app.module";
import {LocationRepository} from "./location.repository";

class LocationServiceMock {
    getAllLocation() : Location[] {
        const location_id = this.getLocationId();
        const location = this.getLocationById(location_id);
        return [location];
    }
    getLocationById(location_id : number) : Location {
        const location = new Location();
        location.location_id = location_id;
        location.location_name = "location_name_1";
        location.district = "west";
        return location;
    }
    getAllLocationDict() : {} {
        const location_id = this.getLocationId();
        const location = this.getLocationById(location_id);

        const myDict = {};
        const locationDict = {
                "locationId": location.location_id,
                "location_name": location.location_name,
                "district": location.district,
        };
        myDict[location_id] = locationDict;
        return myDict;
    }
    getLocationId() : number {
        return 123456;
    }
}

describe('LocationService', () => {
    let locationRepository : LocationRepository;
    let locationService : LocationService;

    beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
           imports : [LocationModule, AppModule],
           providers : [
               {
                   provide : LocationRepository,
                   useValue : {
                       find : jest.fn(),
                       findOne : jest.fn(),
                   }
               },
               LocationService,
           ]
       }).compile();

       locationService = module.get<LocationService>(LocationService);
       locationRepository = module.get<LocationRepository>(LocationRepository);
    })

    it("LocationService - should be defined", () => {
        expect(locationService).toBeDefined();
    });

    it('test - getAllLocation()', async () => {

        locationRepository.find = jest.fn().mockReturnValue(new LocationServiceMock().getAllLocation());
        const result = await locationService.getAllLocation();
        expect(result).toEqual(new LocationServiceMock().getAllLocation());
    });

    it('test - getLocationById()', async () => {
        const location_id = new LocationServiceMock().getLocationId();

        locationRepository.findOne = jest.fn().mockReturnValue(new LocationServiceMock().getLocationById(location_id));
        const result = await locationService.getLocationById(location_id);
        expect(result).toEqual(new LocationServiceMock().getLocationById(location_id));
    });

    it('test - getAllLocationDict()', async () => {
        locationRepository.find = jest.fn().mockReturnValue(new LocationServiceMock().getAllLocation());
        const result = await locationService.getAllLocationDict();
        expect(result).toEqual(new LocationServiceMock().getAllLocationDict());
    });

});