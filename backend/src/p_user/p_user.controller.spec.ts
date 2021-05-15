import {HttpModule, HttpService, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import * as request from 'supertest';
import {P_UserModule} from "./p_user.module";
import {P_UserController} from "./p_user.controller";
import {P_UserService} from "./p_user.service";
import {p_user} from "./schemas/p_user.schema";
import {CreateP_UserDto} from "./dto/create-p_user.dto";
import {UpdatePublicUserDto} from "./dto/update_public_user_dto";

class P_UserControllerMock {
    mockGetAllP_Users: () => p_user[] = () => {
        return [this.mockOneP_User()];
    }
    mockOneP_User : () => p_user = () => {
        const puser = new p_user();
        puser.p_nric = 'p_nric';
        puser.firstname = "first_name";
        puser.lastname = "last_name";
        puser.covid_status = false;

        return puser;
    };
    mockCreateP_User() : p_user {
        const puser = new p_user();
        puser.p_nric = 'p_nric';
        puser.firstname = "first_name";
        puser.lastname = "last_name";
        puser.covid_status = false;

        return puser;
    }
}

describe('P_User Controller',() => {
    let app : INestApplication;
    let p_UserService : P_UserService;
    let httpService : HttpService;

    const mock_getPUserById = jest.fn();

    beforeAll(async () => {
        const controllerMock = new P_UserControllerMock();

        const testAppModule : TestingModule = await Test.createTestingModule({
            imports : [
                P_UserModule,
                AppModule,
                HttpModule,
            ],
            controllers: [P_UserController],
            providers : [
                {provide : P_UserService,
                    useValue : {
                        getP_User : jest.fn(controllerMock.mockGetAllP_Users),
                        getP_UserById : mock_getPUserById,
                        createP_User : jest.fn(controllerMock.mockCreateP_User),
                        updatePublicUser : jest.fn(controllerMock.mockOneP_User)
                    }
                }
            ]
        }).compile();

        app = testAppModule.createNestApplication();
        p_UserService = testAppModule.get<P_UserService>(P_UserService);
        httpService = testAppModule.get<HttpService>(HttpService);
        await app.init();
    });

    afterAll(async () => {
        app = null;
        httpService = null;
    });


    it("P_User Controller - GET all p_user", async () => {
        const res = await request(app.getHttpServer())
            .get("/p_user/")
            .expect(200);
        let result = res.status;
        console.log(res.text);
        expect(result).toBe(200);
    });

    it("P_User Controller - GET one p_user by p_nric", async () => {
        const p_nric = new P_UserControllerMock().mockOneP_User().p_nric;

        mock_getPUserById.mockResolvedValueOnce(new P_UserControllerMock().mockOneP_User());
        const res = await request(app.getHttpServer())
            .get(`/p_user/${p_nric}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("P_User Controller - POST one p_user", async () => {
        const pUser : p_user = new P_UserControllerMock().mockOneP_User();
        const dto = new CreateP_UserDto();
        dto.p_nric = pUser.p_nric;
        dto.firstname = pUser.firstname;
        dto.lastname = pUser.lastname;
        dto.covid_status = pUser.covid_status;

        const res = await request(app.getHttpServer())
            .post('/p_user')
            .send(dto)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
        expect(res.text).toContain(dto.p_nric);
    });

    it("P_User controller - PATCH one p_user", async () => {
        const pUser : p_user = new P_UserControllerMock().mockOneP_User();
        const dto = new UpdatePublicUserDto();
        dto.firstname = pUser.firstname;
        dto.lastname = pUser.lastname;
        dto.covid_status = pUser.covid_status;

        const res = await request(app.getHttpServer())
            .patch(`/p_user/${pUser.p_nric}`)
            .send(dto)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
        expect(res.text).toContain(dto.firstname);
    });

    it("P_User controller - PATCH one p_user (negative)", async () => {
        const pUser : p_user = new P_UserControllerMock().mockOneP_User();
        const dto = new UpdatePublicUserDto();
        dto.firstname = 'invalid_nric';
        dto.lastname = pUser.lastname;
        dto.covid_status = pUser.covid_status;

        mock_getPUserById.mockResolvedValueOnce(null);
        const res = await request(app.getHttpServer())
            .patch(`/p_user/${pUser.p_nric}`)
            .send(dto)
            .expect(400);
        let result = res.status;
        expect(result).toBe(400);
        expect(res.text).toContain("public nric does not exist.");
    });

});