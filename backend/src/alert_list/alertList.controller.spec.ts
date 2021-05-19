import {HttpModule, HttpService, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import * as request from 'supertest';
import {AlertList} from "./schemas/alertList.schema";
import {AlertListModule} from "./alertlist.module";
import {AlertListController} from "./alertList.controller";
import {LocationModule} from "../location/location.module";
import {AlertListService} from "./alertList.service";
import {P_userAlertListDto} from "./dto/p_user-alert-list.dto";
import {AlertListDto, ViewAlertListDto} from "./dto/alert-list.dto";
import {CompositeAlertListService} from "./compositeAlertList.service";
import {LocationService} from "../location/location.service";
import {Location} from "../location/schemas/location.schema";

class AlertListControllerMock {
    getOneAlertList() : AlertList {
        const alert_list = new AlertList();
        alert_list.alertListId = 1;
        alert_list.location_id = 123456;
        alert_list.active = true;
        alert_list.alertTitle = "title";
        alert_list.alertDetail = "detail";
        alert_list.alertDate = new Date();
        return alert_list;
    }
    getP_userAlertListDTO(): P_userAlertListDto[] {
        const alertList = this.getOneAlertList();
        const activeAlertList = new P_userAlertListDto(
            alertList.alertListId,
            alertList.alertTitle,
            alertList.alertDetail,
            alertList.alertDate.toLocaleString(),
            "location_name"
        );
        return [activeAlertList];
    }
    getViewAlertListDTO(): ViewAlertListDto[] {
        const alertList = this.getOneAlertList();
        const viewAlertListDTO = new ViewAlertListDto(
            alertList,
            "location_name"
        );
        return [viewAlertListDTO];
    }
    getAlertLists() : AlertList[] {
        return [this.getOneAlertList()];
    }
    getLocationById(location_id : number) : Location {
        const location = new Location();
        location.location_id = location_id;
        location.location_name = "location_name_1";
        location.district = "west";
        return location;
    }
}

describe('E_User Controller',() => {
    let app : INestApplication;
    let httpService : HttpService;

    const mockGetLocationById = jest.fn();
    const mockGetAlertById = jest.fn();
    const mockdeleteAlertListById = jest.fn();

    beforeAll(async () => {
        const controllerMock = new AlertListControllerMock();

        const testAppModule : TestingModule = await Test.createTestingModule({
            imports : [
                AlertListModule,
                LocationModule,
                AppModule,
                HttpModule,
            ],
            controllers: [AlertListController],
            providers : [
                {provide : AlertListService,
                    useValue : {
                        getAlertById : mockGetAlertById,
                        createAlert : jest.fn(controllerMock.getOneAlertList),
                        updateAlertById : jest.fn(controllerMock.getOneAlertList),
                        deleteAlertListById : mockdeleteAlertListById,
                    }
                },
                {provide : CompositeAlertListService,
                    useValue : {
                        getOnlyActiveAlerts : jest.fn(() => controllerMock.getP_userAlertListDTO()),
                        getAllAlertListDTO : jest.fn(() => controllerMock.getViewAlertListDTO()),
                    }
                },
                {provide : LocationService,
                    useValue : {
                        getLocationById : mockGetLocationById,}
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


    it("E_User Controller - GET getAlertListById()", async () => {
        const testCase = new AlertListControllerMock().getOneAlertList();

        mockGetAlertById.mockReturnValue(new AlertListControllerMock().getOneAlertList());
        const res = await request(app.getHttpServer())
            .get(`/alertlist/${testCase.alertListId}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("E_User Controller - GET getAllActiveAlertList()", async () => {
        const res = await request(app.getHttpServer())
            .get("/alertlist/filterlist/true")
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("E_User Controller - GET getAllAlertList()", async () => {
        const res = await request(app.getHttpServer())
            .get("/alertlist/")
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("E_User Controller - POST createAlert() (positive scenario)", async () => {
        const dto = new AlertListDto();
        dto.location_id = 123456;
        dto.alertTitle = "title";
        dto.alertDetail = "detail";
        dto.active = true;
        dto.alertDate = new Date().toISOString();

        mockGetLocationById.mockReturnValue(new AlertListControllerMock().getOneAlertList());
        const res = await request(app.getHttpServer())
            .post("/alertlist/")
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("E_User Controller - POST createAlert() (negative scenario - 1)", async () => {
        const dto = new AlertListDto();
        dto.location_id = 123456;
        dto.alertTitle = "title";
        dto.alertDetail = "detail";
        dto.active = true;
        dto.alertDate = new Date().toISOString();

        mockGetLocationById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .post("/alertlist/")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("location id is invalid. user is trying to enter a location which doesnt exist in record.");
    });

    it("E_User Controller - POST createAlert() (negative scenario - 2)", async () => {
        const dto = new AlertListDto();
        dto.location_id = 123456;
        dto.alertTitle = "title";
        dto.alertDetail = "detail";
        dto.active = true;

        mockGetLocationById.mockReturnValue(new AlertListControllerMock().getLocationById(123456));
        const res = await request(app.getHttpServer())
            .post("/alertlist/")
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("date is invalid. please review the date string before sending.");
    });

    it("E_User Controller - PATCH createAlert() (positive scenario)", async () => {
        const id = 1;

        const dto = new AlertListDto();
        dto.location_id = 123456;
        dto.alertTitle = "title";
        dto.alertDetail = "detail";
        dto.alertDate = new Date().toISOString();
        dto.active = true;

        mockGetLocationById.mockReturnValue(new AlertListControllerMock().getLocationById(123456));
        mockGetAlertById.mockReturnValue(new AlertListControllerMock().getOneAlertList());
        const res = await request(app.getHttpServer())
            .patch(`/alertlist/${id}`)
            .send(dto)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("E_User Controller - PATCH createAlert() (negative scenario - 1)", async () => {
        const id = 1;

        const dto = new AlertListDto();
        dto.location_id = 123456;
        dto.alertTitle = "title";
        dto.alertDetail = "detail";
        dto.alertDate = new Date().toISOString();
        dto.active = true;

        mockGetAlertById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .patch(`/alertlist/${id}`)
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("alert id is invalid. user is trying to update a alertId which doesnt exist in record.");
    });

    it("E_User Controller - PATCH createAlert() (negative scenario - 2)", async () => {
        const id = 1;

        const dto = new AlertListDto();
        dto.location_id = 123456;
        dto.alertTitle = "title";
        dto.alertDetail = "detail";
        dto.alertDate = new Date().toISOString();
        dto.active = true;

        mockGetLocationById.mockReturnValue(null);
        mockGetAlertById.mockReturnValue(new AlertListControllerMock().getOneAlertList());
        const res = await request(app.getHttpServer())
            .patch(`/alertlist/${id}`)
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("location id is invalid. user is trying to update a location which doesnt exist in record.");
    });

    it("E_User Controller - PATCH createAlert() (negative scenario - 3)", async () => {
        const id = 1;

        const dto = new AlertListDto();
        dto.location_id = 123456;
        dto.alertTitle = "title";
        dto.alertDetail = "detail";
        dto.active = true;

        mockGetLocationById.mockReturnValue(new AlertListControllerMock().getLocationById(123456));
        mockGetAlertById.mockReturnValue(new AlertListControllerMock().getOneAlertList());
        const res = await request(app.getHttpServer())
            .patch(`/alertlist/${id}`)
            .send(dto)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("date is invalid. please review the date string before sending.");
    });

    it("E_User Controller - DELETE deleteAlertListByAlertId() (positive)", async () => {
        const id = 1;

        mockdeleteAlertListById.mockReturnValue(new AlertListControllerMock().getOneAlertList());
        const res = await request(app.getHttpServer())
            .delete(`/alertlist/${id}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("E_User Controller - DELETE deleteAlertListByAlertId() (negative)", async () => {
        const id = 1;

        mockdeleteAlertListById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .delete(`/alertlist/${id}`)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("unable to find alert to delete");
    });

});