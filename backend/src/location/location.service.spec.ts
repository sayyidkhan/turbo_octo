import {LocationService} from "./location.service";
import {Test, TestingModule} from "@nestjs/testing";
import {Location} from "./schemas/location.schema";
import {LocationModule} from "./location.module";
import {AppModule} from "../app.module";
import {LocationRepository} from "./location.repository";

class LocationServiceMock {
    getAllLocation() {
        const location = new Location();
        location.location_id = 123456;
        location.location_name = "location_name_1";
        location.district = "west";

        return [location];
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
                       find : jest.fn()
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

});