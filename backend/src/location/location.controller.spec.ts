import {HttpModule, HttpService, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {LocationService} from "./location.service";
import * as request from 'supertest';
import {LocationModule} from "./location.module";
import {LocationController} from "./location.controller";
import {Location} from './schemas/location.schema';

describe('locationController',() => {
    let app : INestApplication;
    let httpService : HttpService;

    const mockData: () => Location[] = () => {
        const location = new Location();
        location.location_id = 123456;
        location.location_name = "location_name_1";
        location.district = "west";

        return [location];
    }

    beforeAll(async () => {
        const testAppModule : TestingModule = await Test.createTestingModule({
            imports : [LocationModule, AppModule, HttpModule],
            controllers: [LocationController],
            providers : [
                {provide : LocationService,
                useValue : {
                    getAllLocation : jest.fn(mockData)
                }}
            ]
        }).compile();

        app = testAppModule.createNestApplication();
        httpService = testAppModule.get<HttpService>(HttpService);
        await app.init();
    });


    it("LocationController - GET all location", async () => {

       const res = await request(app.getHttpServer())
           .get("/locations/")
           .expect(200);
       let result = res.status;
       expect(result).toBe(200);
    });

});