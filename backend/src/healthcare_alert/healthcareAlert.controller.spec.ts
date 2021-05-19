import {HttpModule, HttpService, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import * as request from 'supertest';
import {CompositeHealthcareAlertService} from "./CompositeHealthcareAlert.service";
import {HealthcareAlertService} from "./healthcareAlert.service";
import {E_UserService} from "../e_user/e_User.service";
import {HealthcareAlertModule} from "./healthcareAlert.module";
import {E_UserModule} from "../e_user/e_User.module";
import {HealthcareAlert} from "./schemas/healthcareAlert.schema";
import {ViewHealthcareAlertsDto} from "./dto/view-healthcareAlerts.dto";
import {E_User} from "../e_user/schemas/e_user.schema";
import {HealthcareAlertController} from "./healthcareAlert.controller";
import {CreateHealthcareAlertsDto} from "./dto/create-healthcareAlerts.dto";
import {UpdateHealthcareAlertsDto} from "./dto/update-healthcareAlerts.dto";

class HealthcareAlertControllerMock {
    getOneHealthAlertList(): HealthcareAlert {
        const obj = new HealthcareAlert();
        obj.e_nric = "e_nric";
        obj.healthcareAlertId = 1;
        obj.date = new Date();
        obj.location_id = 123456;
        obj.description = "description";
        return obj;
    }
    getViewHealthCareAlertsDTO(): ViewHealthcareAlertsDto[] {
        const alertList = this.getOneHealthAlertList();
        const dto = new ViewHealthcareAlertsDto();
        dto.date = alertList.date.toLocaleString();
        dto.location_name = "location_name";
        dto.description = "description";
        dto.e_nric = "e_nric";
        return [dto];
    }
    getAllHealthcareAlertList(): HealthcareAlert[] {
        return [this.getOneHealthAlertList()];
    }
    mockOneE_User: () => E_User = () => {
        const eUser = new E_User();
        eUser.e_nric = 'e_nric';
        eUser.firstname = "first_name";
        eUser.lastname = "last_name";
        eUser.admintype = 'G';
        eUser.password = "12345678";

        return eUser;
    };
}

describe('HealthcareAlert Controller',() => {
    let app : INestApplication;
    let httpService : HttpService;

    const mockUpdateHealthcareAlertByID = jest.fn();
    const mockGetEnterpriseUserById = jest.fn();

    beforeAll(async () => {
        const controllerMock = new HealthcareAlertControllerMock();

        const testAppModule : TestingModule = await Test.createTestingModule({
            imports : [
                HealthcareAlertModule,
                E_UserModule,
                AppModule,
                HttpModule,
            ],
            controllers: [HealthcareAlertController],
            providers : [
                {provide : HealthcareAlertService,
                    useValue : {
                        getHealthcareAlertByID : jest.fn(controllerMock.getOneHealthAlertList),
                        createNewHealthcareAlerts : jest.fn(controllerMock.getOneHealthAlertList),
                        updateHealthcareAlertByID : mockUpdateHealthcareAlertByID,
                    }
                },
                {provide : E_UserService,
                    useValue : {
                        getEnterpriseUserById : mockGetEnterpriseUserById,
                    }
                },
                {provide : CompositeHealthcareAlertService,
                    useValue : {
                        getAllHealthcareAlertsDTO : jest.fn(() => controllerMock.getViewHealthCareAlertsDTO()),
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


    it("HealthCare Alert Controller - GET getHealthcareAlertByID()", async () => {
        const testCase = new HealthcareAlertControllerMock().getOneHealthAlertList();

        mockUpdateHealthcareAlertByID.mockReturnValue(new HealthcareAlertControllerMock().getOneHealthAlertList());
        const res = await request(app.getHttpServer())
            .get(`/healthcare_alert/${testCase.healthcareAlertId}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("HealthCare Alert Controller - GET getAllHealthCareAlerts()", async () => {
        const res = await request(app.getHttpServer())
            .get("/healthcare_alert")
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("HealthCare Alert Controller - POST createNewHealthcareAlerts() (positive)", async () => {
        const dto = new CreateHealthcareAlertsDto();
        dto.e_nric = "e_nric";
        dto.date = new Date().toLocaleString();
        dto.description = "description";
        dto.location_id = 123456;

        mockGetEnterpriseUserById.mockReturnValue(new HealthcareAlertControllerMock().mockOneE_User());
        const res = await request(app.getHttpServer())
            .post("/healthcare_alert")
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("HealthCare Alert Controller - POST createNewHealthcareAlerts() (negative scenario - 1)", async () => {
        const dto = new CreateHealthcareAlertsDto();
        dto.e_nric = "e_nric";
        dto.date = new Date().toLocaleString();
        dto.description = "description";
        dto.location_id = 123456;

        mockGetEnterpriseUserById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .post("/healthcare_alert")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("enterpise nric invalid. user is trying to enter enterprise nric which doesnt exist in record.");
    });

    it("HealthCare Alert Controller - POST createNewHealthcareAlerts() (negative scenario - 2)", async () => {
        const dto = new CreateHealthcareAlertsDto();
        dto.e_nric = "e_nric";
        dto.date = "";
        dto.description = "description";
        dto.location_id = 123456;

        mockGetEnterpriseUserById.mockReturnValue(new HealthcareAlertControllerMock().mockOneE_User());
        const res = await request(app.getHttpServer())
            .post("/healthcare_alert")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("date is invalid. please review the date string before sending.");
    });

    it("HealthCare Alert Controller - PATCH updateHealthcareAlerts() (positive)", async () => {
        const dto = new UpdateHealthcareAlertsDto();
        dto.e_nric = "e_nric";
        dto.date = new Date().toLocaleString();
        dto.description = "description";
        dto.location_id = 123456;

        const id = 1;

        mockGetEnterpriseUserById.mockReturnValue(new HealthcareAlertControllerMock().mockOneE_User());
        const res = await request(app.getHttpServer())
            .patch(`/healthcare_alert/${id}`)
            .send(dto)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("HealthCare Alert Controller - PATCH updateHealthcareAlerts() (negative)", async () => {
        const dto = new UpdateHealthcareAlertsDto();
        dto.e_nric = "e_nric";
        dto.date = "";
        dto.description = "description";
        dto.location_id = 123456;

        const id = 1;

        mockGetEnterpriseUserById.mockReturnValue(new HealthcareAlertControllerMock().mockOneE_User());
        const res = await request(app.getHttpServer())
            .patch(`/healthcare_alert/${id}`)
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("date is invalid. please review the date string before sending.");
    });

});