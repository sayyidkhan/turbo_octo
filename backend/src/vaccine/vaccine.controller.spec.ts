import {HttpModule, HttpService, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import * as request from 'supertest';
import {P_UserService} from "../p_user/p_user.service";
import {Vaccine_reportService} from "./vaccine_report.service";
import {E_UserService} from "../e_user/e_User.service";
import {P_UserModule} from "../p_user/p_user.module";
import {E_UserModule} from "../e_user/e_User.module";
import {v_cert} from "./schemas/vaccine.schema";
import {Location} from "../location/schemas/location.schema";
import {VaccineModule} from "./vaccine.module";
import {VaccineController} from "./vaccine.controller";
import {VaccineService} from "./vaccine.service";
import {CreateVaccineDto} from "./dto/create-vaccine.dto";
import {p_user} from "../p_user/schemas/p_user.schema";
import {E_User} from "../e_user/schemas/e_user.schema";
import {ReportMonthlyQueryCtracingDto, ReportWeeklyQueryCtracingDto} from "../ctracing/dto/report-ctracing.dto";


class VaccineControllerMock {
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
    getOneVaccine(): v_cert {
        const vCert = new v_cert();
        vCert.v_cert_id = 1;
        vCert.p_nric = "p_nric";
        vCert.e_nric = "e_nric";
        vCert.v_date = new Date();
        return vCert;
    }
    getVaccineList(): v_cert[] {
        return [this.getOneVaccine()];
    }
}

describe('Vaccine Controller',() => {
    let app : INestApplication;
    let httpService : HttpService;

    const mockGetP_UserById = jest.fn();
    const mockGetEnterpriseUserById = jest.fn();

    beforeAll(async () => {
        const controllerMock = new VaccineControllerMock();

        const testAppModule : TestingModule = await Test.createTestingModule({
            imports : [
                VaccineModule,
                P_UserModule,
                E_UserModule,
                AppModule,
                HttpModule,
            ],
            controllers: [VaccineController],
            providers : [
                {provide : VaccineService,
                    useValue : {
                        getLatestVaccinationRecordOnly : jest.fn(() => new VaccineControllerMock().getOneVaccine()),
                        getCtracingByLatestId: jest.fn(() => new VaccineControllerMock().getOneVaccine()),
                        getVaccineById: jest.fn(() => new VaccineControllerMock().getOneVaccine()),
                        getVaccineByp_nric: jest.fn(() => new VaccineControllerMock().getVaccineList()),
                        getVaccineBye_nric: jest.fn(() => new VaccineControllerMock().getVaccineList()),
                        getAllVaccinationList: jest.fn(() => new VaccineControllerMock().getVaccineList()),
                        createVaccine : jest.fn(() => new VaccineControllerMock().getOneVaccine()),
                    }
                },
                {provide : P_UserService,
                    useValue : {
                        getP_UserById: mockGetP_UserById,
                    }
                },
                {provide : E_UserService,
                    useValue : {
                        getEnterpriseUserById: mockGetEnterpriseUserById,
                    }
                },
                {provide : Vaccine_reportService,
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

    it("vaccines Controller - GET getVaccineById()", async () => {
        const testCase = new VaccineControllerMock().getOneVaccine();

        const res = await request(app.getHttpServer())
            .get(`/vaccines/${testCase.v_cert_id}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("vaccines Controller - GET getVaccineRecordByp_nric()", async () => {
        const testCase = new VaccineControllerMock().getOneVaccine();

        const res = await request(app.getHttpServer())
            .get(`/vaccines/latest_vaccine_record/${testCase.p_nric}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("vaccines Controller - GET getVaccineByp_nric()", async () => {
        const testCase = new VaccineControllerMock().getOneVaccine();

        const res = await request(app.getHttpServer())
            .get(`/vaccines/p_user/${testCase.p_nric}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("vaccines Controller - GET getVaccineBye_nric()", async () => {
        const testCase = new VaccineControllerMock().getOneVaccine();

        const res = await request(app.getHttpServer())
            .get(`/vaccines/e_user/${testCase.e_nric}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("vaccines Controller - GET getAllVaccinationList()", async () => {
        const res = await request(app.getHttpServer())
            .get("/vaccines/")
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("vaccines Controller - GET createVaccine() (positive)", async () => {
        const dto = new CreateVaccineDto();
        dto.p_nric = "p_nric";
        dto.e_nric = "e_nric";
        dto.v_date = new Date().toISOString();

        const res = await request(app.getHttpServer())
            .post("/vaccines/")
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("vaccines Controller - GET createVaccine() (negative scenario - 1)", async () => {
        const dto = new CreateVaccineDto();
        dto.p_nric = null;
        dto.e_nric = "e_nric";
        dto.v_date = new Date().toISOString();

        mockGetP_UserById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .post("/vaccines/")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("public nric invalid. user is trying to enter public nric which doesnt exist in record.");
    });

    it("vaccines Controller - GET createVaccine() (negative scenario - 2)", async () => {
        const dto = new CreateVaccineDto();
        dto.p_nric = null;
        dto.e_nric = "e_nric";
        dto.v_date = new Date().toISOString();

        mockGetP_UserById.mockReturnValue(new p_user());
        mockGetEnterpriseUserById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .post("/vaccines/")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("enterpise nric invalid. user is trying to enter enterprise nric which doesnt exist in record.");
    });


    it("vaccines Controller - GET createVaccine() (negative scenario - 3)", async () => {
        const dto = new CreateVaccineDto();
        dto.p_nric = null;
        dto.e_nric = "e_nric";
        dto.v_date = "";

        mockGetP_UserById.mockReturnValue(new p_user());
        mockGetEnterpriseUserById.mockReturnValue(new E_User());
        const res = await request(app.getHttpServer())
            .post("/vaccines/")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("date is invalid. please review the date string before sending.");
    });

    it("vaccines Controller - POST generateMonthlyReport() (positive)", async () => {
        const dto = new ReportMonthlyQueryCtracingDto();
        const date1 = new Date("1/1/2021");
        dto.date_from = date1.toISOString();
        const date2 = new Date("3/3/2021");
        dto.date_to = date2.toISOString();

        const res = await request(app.getHttpServer())
            .post("/vaccines/report/monthly/")
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("vaccines Controller - POST generateMonthlyReport() (negative)", async () => {
        const dto = new ReportMonthlyQueryCtracingDto();
        const date1 = new Date("1/1/2021");
        dto.date_to = date1.toISOString();
        dto.date_from = "";

        const res = await request(app.getHttpServer())
            .post("/vaccines/report/monthly/")
            .send(dto)
            .expect(400);
        let result = res.status;
        expect(result).toBe(400);
    });

    it("vaccines Controller - POST generateWeeklyReport() (positive)", async () => {
        const dto = new ReportWeeklyQueryCtracingDto(5,2021);

        const res = await request(app.getHttpServer())
            .post("/vaccines/report/weekly/")
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("vaccines Controller - POST generateWeeklyReport() (negative)", async () => {
        const dto = new ReportWeeklyQueryCtracingDto(null,null);

        const res = await request(app.getHttpServer())
            .post("/vaccines/report/weekly/")
            .send(dto)
            .expect(400);
        let result = res.status;
        expect(result).toBe(400);
    });

});