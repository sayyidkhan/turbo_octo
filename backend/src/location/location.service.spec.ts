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
    let repository : LocationRepository;
    let service : LocationService;

    beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
           imports : [
               LocationModule,
               AppModule,
           ],
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

       service = module.get<LocationService>(LocationService);
       repository = module.get<LocationRepository>(LocationRepository);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });


    it("LocationService - should be defined", () => {
        expect(service).toBeDefined();
    });

    it('test - getAllLocation()', async () => {

        repository.find = jest.fn().mockReturnValue(new LocationServiceMock().getAllLocation());
        const result = await service.getAllLocation();
        expect(result).toEqual(new LocationServiceMock().getAllLocation());
    });

    it('test - getLocationById()', async () => {
        const location_id = new LocationServiceMock().getLocationId();

        repository.findOne = jest.fn().mockReturnValue(new LocationServiceMock().getLocationById(location_id));
        const result = await service.getLocationById(location_id);
        expect(result).toEqual(new LocationServiceMock().getLocationById(location_id));
    });

    it('test - getAllLocationDict()', async () => {
        repository.find = jest.fn().mockReturnValue(new LocationServiceMock().getAllLocation());
        const result = await service.getAllLocationDict();
        expect(result).toEqual(new LocationServiceMock().getAllLocationDict());
    });

});