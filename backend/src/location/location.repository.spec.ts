import {LocationService} from "./location.service";
import {Test, TestingModule} from "@nestjs/testing";
import {Location, LocationSchema} from "./schemas/location.schema";
import {LocationModule} from "./location.module";
import {AppModule} from "../app.module";
import {LocationRepository} from "./location.repository";
import {MongooseModule} from "@nestjs/mongoose";

describe('LocationRepository', () => {
    let repository : LocationRepository;
    let service : LocationService;

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

       service = module.get<LocationService>(LocationService);
       repository = module.get<LocationRepository>(LocationRepository);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });

    it('test - find()', async () => {
        await service.getAllLocation();
        expect(repository.find({})).toBeDefined();
    });

    it('test - fineOne()', async () => {
        const location_id = 123456;

        await service.getLocationById(location_id);
        expect(repository.findOne({})).toBeDefined();
    });

});