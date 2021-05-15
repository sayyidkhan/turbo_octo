import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {E_UserService} from "./e_User.service";
import {E_UserRepository} from "./e_User.repository";
import {E_User} from "./schemas/e_user.schema";
import {E_UserModule} from "./e_User.module";
import {UpdateEnterpriseUserDto} from "./dto/update-eUser.dto";

class E_UserServiceMock {
    getE_UserById(e_nric : string) {
        const user = new E_User();
        user.e_nric = e_nric;
        return user;
    }
    getE_nric() {
        return "e_nric";
    }
    getOne_E_User() {
        const user = new E_User();
        user.e_nric = "e_nric";
        user.firstname = "firstname";
        user.lastname = "lastname";
        user.password = '12345678';
        user.admintype = 'G';
        return user;
    }
    getP_User() {
        const user = this.getOne_E_User();
        return [user];
    }
    updatePublicUser() {
        return this.getOne_E_User();
    }
}

describe('E_User Service', () => {
    let repository : E_UserRepository;
    let service : E_UserService;

    beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
           imports : [
               E_UserModule,
               AppModule,
           ],
           providers : [
               {
                   provide : E_UserRepository,
                   useValue : {
                       find : jest.fn(),
                       findOne : jest.fn(),
                   }
               },
               E_UserService,
           ]
       }).compile();

       service = module.get<E_UserService>(E_UserService);
       repository = module.get<E_UserRepository>(E_UserRepository);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });


    it("E_UserService - should be defined", () => {
        expect(service).toBeDefined();
    });

    it('test - getAllEnterpriseUser()', async () => {

        repository.find = jest.fn().mockReturnValue(new E_UserServiceMock().getP_User());
        const result = await service.getAllEnterpriseUser();
        expect(result).toEqual(new E_UserServiceMock().getP_User());
    });

    it('test - getEnterpriseUserById()', async () => {
        const nric =  new E_UserServiceMock().getE_nric();
        const e_nric = new E_UserServiceMock().getE_UserById(nric).e_nric;

        repository.findOne = jest.fn().mockReturnValue(new E_UserServiceMock().getE_UserById(e_nric));
        const result = await service.getEnterpriseUserById(e_nric);
        expect(result).toEqual(new E_UserServiceMock().getE_UserById(e_nric));
    });

    it('test - createNewEnterpriseUser()', async () => {
        const user = new E_UserServiceMock().getOne_E_User();
        repository.create = jest.fn().mockReturnValue(user);
        const result = await service.createNewEnterpriseUser(user.e_nric,user.firstname,user.lastname,user.password,user.admintype);
        expect(result.e_nric).toEqual(user.e_nric);
    });

    it('test - updatePublicUser()', async () => {
        const user = new E_UserServiceMock().updatePublicUser();
        repository.findOneAndUpdate = jest.fn().mockReturnValue(user);
        const result = await service.updateEnterpriseUser(user.e_nric,new UpdateEnterpriseUserDto());
        expect(result.e_nric).toEqual(user.e_nric);
    });

});