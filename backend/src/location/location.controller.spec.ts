import {HttpModule, HttpService, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {LocationService} from "./location.service";
import * as request from 'supertest';
import {LocationModule} from "./location.module";
import {LocationController} from "./location.controller";
import {Location} from './schemas/location.schema';

class LocationControllerMock {
    mockGetAllLocation: () => Location[] = () => {
        return [this.mockOneLocation()];
    }
    mockOneLocation : () => Location = () => {
        const location = new Location();
        location.location_id = 123456;
        location.location_name = "location_name_1";
        location.district = "west";

        return location;
    };
}

describe('locationController',() => {
    let app : INestApplication;
    let httpService : HttpService;

    beforeAll(async () => {
        const controllerMock = new LocationControllerMock();

        const testAppModule : TestingModule = await Test.createTestingModule({
            imports : [LocationModule, AppModule, HttpModule],
            controllers: [LocationController],
            providers : [
                {provide : LocationService,
                useValue : {
                    getAllLocation : jest.fn(controllerMock.mockGetAllLocation),
                    getLocationById : jest.fn(controllerMock.mockOneLocation),
                }}
            ]
        }).compile();

        app = testAppModule.createNestApplication();
        httpService = testAppModule.get<HttpService>(HttpService);
        await app.init();
    });

    afterAll(async () => {
       app = null;
       httpService = null;
    });


    it("LocationController - GET all location", async () => {

       const res = await request(app.getHttpServer())
           .get("/locations/")
           .expect(200);
       let result = res.status;
       expect(result).toBe(200);
    });

    it("LocationController - GET all location by Id", async () => {
        const location_id = 123456;

        const res = await request(app.getHttpServer())
            .get(`/locations/${location_id}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

});