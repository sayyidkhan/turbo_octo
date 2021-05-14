import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {P_UserRepository} from "./p_user.repository";
import {P_UserService} from "./p_user.service";
import {P_UserModule} from "./p_user.module";
import {p_user} from "./schemas/p_user.schema";
import {UpdatePublicUserDto} from "./dto/update_public_user_dto";

class P_UserServiceMock {
    getP_UserById(p_nric : string) {
        const user = new p_user();
        user.p_nric = p_nric;
        return user;
    }
    getP_nric() {
        return "p_nric";
    }
    getOne_P_User() {
        const user = new p_user();
        user.p_nric = "p_nric";
        user.firstname = "firstname";
        user.lastname = "lastname";
        user.covid_status = true;
        return user;
    }
    getP_User() {
        const user = this.getOne_P_User();
        return [user];
    }
    updatePublicUser() {
        return this.getOne_P_User();
    }
}

describe('P_User Service', () => {
    let repository : P_UserRepository;
    let service : P_UserService;

    beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
           imports : [
               P_UserModule,
               AppModule,
           ],
           providers : [
               {
                   provide : P_UserRepository,
                   useValue : {
                       find : jest.fn(),
                       findOne : jest.fn(),
                   }
               },
               P_UserService,
           ]
       }).compile();

       service = module.get<P_UserService>(P_UserService);
       repository = module.get<P_UserRepository>(P_UserRepository);
    })

    it("P_UserService - should be defined", () => {
        expect(service).toBeDefined();
    });

    it('test - getP_User()', async () => {

        repository.find = jest.fn().mockReturnValue(new P_UserServiceMock().getP_User());
        const result = await service.getP_User();
        expect(result).toEqual(new P_UserServiceMock().getP_User());
    });

    it('test - getE_UserById()', async () => {
        const nric =  new P_UserServiceMock().getP_nric();
        const p_nric = new P_UserServiceMock().getP_UserById(nric).p_nric;

        repository.findOne = jest.fn().mockReturnValue(new P_UserServiceMock().getP_UserById(p_nric));
        const result = await service.getP_UserById(p_nric);
        expect(result).toEqual(new P_UserServiceMock().getP_UserById(p_nric));
    });

    it('test - createP_User()', async () => {
        const user = new P_UserServiceMock().getOne_P_User();
        repository.create = jest.fn().mockReturnValue(user);
        const result = await service.createP_User(user.p_nric,user.firstname,user.lastname,user.covid_status);
        expect(result.p_nric).toEqual(user.p_nric);
    });

    it('test - updatePublicUser()', async () => {
        const user = new P_UserServiceMock().updatePublicUser();
        repository.findOneAndUpdate = jest.fn().mockReturnValue(user);
        const result = await service.updatePublicUser(user.p_nric,new UpdatePublicUserDto());
        expect(result.p_nric).toEqual(user.p_nric);
    });

});