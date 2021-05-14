import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {MongooseModule} from "@nestjs/mongoose";
import {E_UserRepository} from "./e_User.repository";
import {E_UserService} from "./e_User.service";
import {E_UserModule} from "./e_User.module";
import {E_User, E_UserSchema} from "./schemas/e_user.schema";
import {UpdateEnterpriseUserDto} from "./dto/update-eUser.dto";

describe('E_UserRepository', () => {
    let repository : E_UserRepository;
    let service : E_UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                E_UserModule,
                AppModule,
                MongooseModule.forFeature([{ name: E_User.name, schema: E_UserSchema }]),
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

    it('test - find()', async () => {
        await service.getAllEnterpriseUser();
        expect(repository.find({})).toBeDefined();
    });

    it('test - fineOne()', async () => {
        await service.getEnterpriseUserById("e_nric");
        expect(repository.findOne({})).toBeDefined();
    });

    it('test - createNewEnterpriseUser()', async () => {
        const e_nric = "e_nric";
        const firstName = "firstName";
        const lastName = "lastName";
        const password = "password";
        const adminType = "adminType";

        const persistence = {
            e_nric : e_nric,
            firstname : firstName,
            lastname : lastName,
            password : password,
            admintype: adminType,
        };

        await service.createNewEnterpriseUser(e_nric,firstName,lastName,password,adminType);
        expect(repository.create(persistence)).toBeDefined();
    });

    it("test - updateEnterpriseUser()", async () => {
        const persistence = new UpdateEnterpriseUserDto();
        await service.updateEnterpriseUser("e_nric",persistence);
        expect(repository.findOneAndUpdate({ e_nric : "e_nric" },persistence)).toBeDefined();
    });

    it("test - deleteEnterpriseUserById()", async () => {
        const persistence = {
            _id: "609e07a73ab105441f8325eb",
            e_nric: 'e_nric',
            firstname: 'firstName',
            lastname: 'lastName',
            password: 'password',
            admintype: 'adminType',
            __v: 0
        };
        await service.deleteEnterpriseUserById(persistence['e_nric']);
    });

});