import {LocationService} from "./location.service";
import {Test, TestingModule} from "@nestjs/testing";
import {Location, LocationSchema} from "./schemas/location.schema";
import {LocationModule} from "./location.module";
import {AppModule} from "../app.module";
import {LocationRepository} from "./location.repository";
import {MongooseModule} from "@nestjs/mongoose";

describe('LocationService', () => {
    let locationRepository : LocationRepository;
    let locationService : LocationService;

    beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
           imports : [
               LocationModule,
               AppModule,
               MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
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

       locationService = module.get<LocationService>(LocationService);
       locationRepository = module.get<LocationRepository>(LocationRepository);
    })

    it('test - find()', async () => {
        await locationService.getAllLocation();
        expect(locationRepository.find({})).toBeDefined();
    });

    it('test - fineOne()', async () => {
        const location_id = 123456;

        await locationService.getLocationById(location_id);
        expect(locationRepository.findOne({})).toBeDefined();
    });

});