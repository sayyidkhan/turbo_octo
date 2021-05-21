import {HttpModule, HttpService, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import * as request from 'supertest';
import {CtracingController} from "./ctracing.controller";
import {CtracingModule} from "./ctracing.module";
import {CtracingService} from "./ctracing.service";
import {P_UserService} from "../p_user/p_user.service";
import {LocationService} from "../location/location.service";
import {Ctracing_reportService} from "./ctracing_report.service";
import {Location} from "../location/schemas/location.schema";
import {c_tracing} from "./schemas/ctracing.schema";
import {CreateCtracingDto} from "./dto/create-ctracing.dto";
import {p_user} from "../p_user/schemas/p_user.schema";
import {ReportMonthlyQueryCtracingDto, ReportWeeklyQueryCtracingDto} from "./dto/report-ctracing.dto";


class CtracingControllerMock {
    getAllLocationDict() : {} {
        const location = new Location();
        location.location_id = 123456;
        location.location_name = "location_name_1";
        location.district = "west";

        const myDict = {};
        const locationDict = {
            "locationId": location.location_id,
            "location_name": location.location_name,
            "district": location.district,
        };
        myDict[location.location_id] = locationDict;
        return myDict;
    }
    getOneCtracing() {
        const ctracing = new c_tracing();
        ctracing.location_id = 123456;
        ctracing.date = new Date();
        ctracing.p_nric = "p_nric";
        ctracing.ct_id = 1;
        return ctracing;
    }
    getAllCtracing() {
        return [this.getOneCtracing()];
    }
}

describe('Ctracing Controller',() => {
    let app : INestApplication;
    let httpService : HttpService;

    const mockGetP_UserById = jest.fn();
    const mockGetLocationById = jest.fn();

    beforeAll(async () => {
        const controllerMock = new CtracingControllerMock();

        const testAppModule : TestingModule = await Test.createTestingModule({
            imports : [
                CtracingModule,
                AppModule,
                HttpModule,
            ],
            controllers: [CtracingController],
            providers : [
                {provide : CtracingService,
                    useValue : {
                        getCtracingByLatestId: jest.fn(() => new CtracingControllerMock().getAllCtracing()),
                        getCtracingByNric: jest.fn(() => new CtracingControllerMock().getAllCtracing()),
                        getCtracingById : jest.fn(() => new CtracingControllerMock().getOneCtracing()),
                        getCtracingByLocationID : jest.fn(() => new CtracingControllerMock().getAllCtracing()),
                        createCtracing : jest.fn(() => new CtracingControllerMock().getOneCtracing()),
                    }
                },
                {provide : P_UserService,
                    useValue : {
                        getP_UserById: mockGetP_UserById,
                    }
                },
                {provide : LocationService,
                    useValue : {
                        getLocationById: mockGetLocationById,
                        getLocationByDistrict: jest.fn(new CtracingControllerMock().getAllLocationDict),
                        getAllLocationDict : jest.fn(new CtracingControllerMock().getAllLocationDict),
                    }
                },
                {provide : Ctracing_reportService,
                    useValue : {
                        generateMonthlyReport: jest.fn(),
                        generateWeeklyReport : jest.fn(),
                    }
                },
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

    it("c_tracing Controller - GET getCtracing()", async () => {
        const testCase = new CtracingControllerMock().getOneCtracing();

        const res = await request(app.getHttpServer())
            .get(`/c_tracing/${testCase.ct_id}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("c_tracing Controller - GET getCtracingByNric()", async () => {
        const testCase = new CtracingControllerMock().getOneCtracing();

        const res = await request(app.getHttpServer())
            .get(`/c_tracing/searchbynric/${testCase.p_nric}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("c_tracing Controller - GET getCtracings()", async () => {
        const res = await request(app.getHttpServer())
            .get("/c_tracing/")
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("c_tracing Controller - GET getCtracingsByDistrict()", async () => {
        const district = "west";
        const res = await request(app.getHttpServer())
            .get(`/c_tracing/ctracing_by_district/${district}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("c_tracing Controller - GET getCtracingsByLocationId()", async () => {
        const location_id = "location_id";
        const res = await request(app.getHttpServer())
            .get(`/c_tracing/ctracing_by_locationid/${location_id}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("c_tracing Controller - POST createCtracing() (positive)", async () => {
        const dto = new CreateCtracingDto();
        dto.location_id = 123456;
        dto.p_nric = "p_nric";
        dto.date = new Date().toLocaleString();

        const res = await request(app.getHttpServer())
            .post("/c_tracing/")
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("c_tracing Controller - POST createCtracing() (negative scenario - 1)", async () => {
        const dto = new CreateCtracingDto();
        dto.location_id = 123456;
        dto.p_nric = "p_nric";
        dto.date = new Date().toLocaleString();

        mockGetP_UserById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .post("/c_tracing/")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("public nric invalid. user is trying to enter public nric which doesnt exist in record.");
    });

    it("c_tracing Controller - POST createCtracing() (negative scenario - 2)", async () => {
        const dto = new CreateCtracingDto();
        dto.location_id = 123456;
        dto.p_nric = "p_nric";
        dto.date = new Date().toLocaleString();

        mockGetP_UserById.mockReturnValue(new p_user());
        mockGetLocationById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .post("/c_tracing/")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("location id is invalid. user is trying to enter a location which doesnt exist in record.");
    });

    it("c_tracing Controller - POST createCtracing() (negative scenario - 3)", async () => {
        const dto = new CreateCtracingDto();
        dto.location_id = 123456;
        dto.p_nric = "p_nric";
        dto.date = "";

        mockGetP_UserById.mockReturnValue(new p_user());
        mockGetLocationById.mockReturnValue(new Location());
        const res = await request(app.getHttpServer())
            .post("/c_tracing/")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("date is invalid. please review the date string before sending.");
    });

    it("c_tracing Controller - POST generateMonthlyReport() (positive)", async () => {
        const dto = new ReportMonthlyQueryCtracingDto();
        const date1 = new Date("1/1/2021");
        dto.date_from = date1.toLocaleString();
        const date2 = new Date("3/3/2021");
        dto.date_to = date2.toLocaleString();

        const res = await request(app.getHttpServer())
            .post("/c_tracing/report/monthly/")
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("c_tracing Controller - POST generateMonthlyReport() (negative)", async () => {
        const dto = new ReportMonthlyQueryCtracingDto();
        const date1 = new Date("1/1/2021");
        dto.date_to = date1.toLocaleString();
        dto.date_from = "";

        const res = await request(app.getHttpServer())
            .post("/c_tracing/report/monthly/")
            .send(dto)
            .expect(400);
        let result = res.status;
        expect(result).toBe(400);
    });

    it("c_tracing Controller - POST generateWeeklyReport() (positive)", async () => {
        const dto = new ReportWeeklyQueryCtracingDto();
        dto.year = 2021;
        dto.month = 5;

        const res = await request(app.getHttpServer())
            .post("/c_tracing/report/weekly/")
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("c_tracing Controller - POST generateWeeklyReport() (negative)", async () => {
        const dto = new ReportWeeklyQueryCtracingDto();

        const res = await request(app.getHttpServer())
            .post("/c_tracing/report/weekly/")
            .send(dto)
            .expect(400);
        let result = res.status;
        expect(result).toBe(400);
    });


});