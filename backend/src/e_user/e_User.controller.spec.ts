import {HttpModule, HttpService, INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import * as request from 'supertest';
import {E_UserController} from "./e_User.controller";
import {E_UserModule} from "./e_User.module";
import {E_UserService} from "./e_User.service";
import {E_User} from "./schemas/e_user.schema";
import {LoginEnterpriseUserDto} from "./dto/login-eUser.dto";
import {CreateEnterpriseUserDto} from "./dto/create-eUser.dto";
import {UpdateEnterpriseUserDto} from "./dto/update-eUser.dto";

class E_UserControllerMock {
    mockGetAllE_Users: () => E_User[] = () => {
        return [this.mockOneE_User()];
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
    mockLogin(): LoginEnterpriseUserDto {
        const login = new LoginEnterpriseUserDto();
        login.e_nric = "e_nric";
        login.password = "12345678";
        return login;
    }
    mockCreate(): CreateEnterpriseUserDto {
        const create = new CreateEnterpriseUserDto();
        create.e_nric = "e_nric";
        create.admintype = "G";
        create.firstname = "first_name";
        create.lastname = "last_name";
        create.password = "12345678";
        return create;
    }
    mockUpdate() : UpdateEnterpriseUserDto {
        const update = new UpdateEnterpriseUserDto();
        update.firstname = "first_name";
        update.lastname = "last_name";
        update.password = "12345678";
        update.admintype = "G";
        return update;
    }
}

describe('E_User Controller',() => {
    let app : INestApplication;
    let httpService : HttpService;

    const mockGetEnterpriseUserById = jest.fn();
    const mockDeleteEnterpriseUserById = jest.fn();

    beforeAll(async () => {
        const controllerMock = new E_UserControllerMock();

        const testAppModule : TestingModule = await Test.createTestingModule({
            imports : [
                E_UserModule,
                AppModule,
                HttpModule,
            ],
            controllers: [E_UserController],
            providers : [
                {provide : E_UserService,
                    useValue : {
                        getAllEnterpriseUser : jest.fn(controllerMock.mockGetAllE_Users),
                        getEnterpriseUserById : mockGetEnterpriseUserById,
                        createNewEnterpriseUser : jest.fn(controllerMock.mockOneE_User),
                        updateEnterpriseUser : jest.fn(controllerMock.mockOneE_User),
                        deleteEnterpriseUserById : mockDeleteEnterpriseUserById,
                    }
                }
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

    it("E_User Controller - GET all e_user", async () => {
        const res = await request(app.getHttpServer())
            .get("/e_user/")
            .expect(200);
        let result = res.status;
        console.log(res.text);
        expect(result).toBe(200);
    });


    it("E_User Controller - GET one e_user", async () => {
        const testCase = new E_UserControllerMock().mockOneE_User();
        const e_nric = testCase.e_nric;

        const res = await request(app.getHttpServer())
            .get(`/e_user/${e_nric}`)
            .expect(200);
        let result = res.status;
        console.log(res.text);
        expect(result).toBe(200);
    });

    it("E_User Controller - POST login api (positive scenario)", async () => {
        const mockLogin = new E_UserControllerMock().mockLogin();

        mockGetEnterpriseUserById.mockReturnValue(new E_UserControllerMock().mockOneE_User());
        const res = await request(app.getHttpServer())
            .post("/e_user/login")
            .send(mockLogin)
            .expect(201);
        let result = res.status;
        console.log(res.text);
        expect(result).toBe(201);
    });

    it("E_User Controller - POST login api (negative scenario)", async () => {
        const mockLogin = new E_UserControllerMock().mockLogin();
        mockLogin.e_nric = "";

        mockGetEnterpriseUserById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .post("/e_user/login")
            .send(mockLogin)
            .expect(400);
        let result = res.status;
        let text =res.text;
        expect(result).toBe(400);
        expect(text).toContain("eNRIC does not exist.");
    });

    it("E_User Controller - POST login api (negative scenario)", async () => {
        const mockLogin = new E_UserControllerMock().mockLogin();
        mockLogin.password = "";

        mockGetEnterpriseUserById.mockReturnValue(new E_UserControllerMock().mockOneE_User());
        const res = await request(app.getHttpServer())
            .post("/e_user/login")
            .send(mockLogin)
            .expect(400);
        let result = res.status;
        let text =res.text;
        expect(result).toBe(400);
        expect(text).toContain("incorrect password.");
    });

    it("E_User Controller - POST create new user (positive scenario)", async () => {
        const mockCreate = new E_UserControllerMock().mockCreate();

        mockGetEnterpriseUserById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .post("/e_user")
            .send(mockCreate)
            .expect(201);
        let result = res.status;
        expect(result).toBe(201);
    });

    it("E_User Controller - POST create new user (negative scenario)", async () => {
        const mockCreate = new E_UserControllerMock().mockCreate();

        mockGetEnterpriseUserById.mockReturnValue(new E_UserControllerMock().mockOneE_User());
        const res = await request(app.getHttpServer())
            .post("/e_user")
            .send(mockCreate)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("unable to add existing user.");
    });

    it("E_User Controller - PATCH update existing user (positive scenario)", async () => {
        const mockUpdate = new E_UserControllerMock().mockUpdate();
        const e_nric = "e_nric";

        mockGetEnterpriseUserById.mockReturnValue(new E_UserControllerMock().mockOneE_User());
        const res = await request(app.getHttpServer())
            .patch(`/e_user/${e_nric}`)
            .send(mockUpdate)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("E_User Controller - PATCH update existing user (negative scenario)", async () => {
        const mockUpdate = new E_UserControllerMock().mockUpdate();
        const e_nric = "e_nric";

        mockGetEnterpriseUserById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .patch(`/e_user/${e_nric}`)
            .send(mockUpdate)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("eNRIC does not exist.");
    });

    it("E_User Controller - DELETE existing user (positive scenario)", async () => {
        const testCase = new E_UserControllerMock().mockOneE_User();

        mockDeleteEnterpriseUserById.mockReturnValue(testCase);
        const res = await request(app.getHttpServer())
            .delete(`/e_user/${testCase.e_nric}`)
            .expect(200);
        let result = res.status;
        expect(result).toBe(200);
    });

    it("E_User Controller - DELETE existing user (negative scenario)", async () => {
        const testCase = new E_UserControllerMock().mockOneE_User();

        mockDeleteEnterpriseUserById.mockReturnValue(null);
        const res = await request(app.getHttpServer())
            .delete(`/e_user/${testCase.e_nric}`)
            .expect(400);
        let result = res.status;
        let text = res.text;
        expect(result).toBe(400);
        expect(text).toContain("unable to find username to delete");
    });



});