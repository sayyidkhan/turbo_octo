import {P_UserService} from "./p_user.service";
import {P_UserRepository} from "./p_user.repository";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {p_user, P_UserSchema} from "./schemas/p_user.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {P_UserModule} from "./p_user.module";
import {UpdatePublicUserDto} from "./dto/update_public_user_dto";


describe("p_user Repository", () => {
   let pUserRepository : P_UserRepository;
   let pUserService : P_UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                P_UserModule,
                AppModule,
                MongooseModule.forFeature([{ name: p_user.name, schema: P_UserSchema }]),
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

        pUserService = module.get<P_UserService>(P_UserService);
        pUserRepository = module.get<P_UserRepository>(P_UserRepository);
    });

    it('test - find()', async () => {
       await pUserService.getP_User();
        expect(pUserRepository.find({})).toBeDefined();
    });

    it('test - findOne()', async () => {
        await pUserService.getP_UserById("p_nric");
        expect(pUserRepository.findOne({})).toBeDefined();
    });

    it('test - create()', async () => {
        await pUserService.createP_User("p_nric","firstname","lastname", true);
        const user = new p_user();
        expect(pUserRepository.create(user)).toBeDefined();
    });

    it('test - create()', async () => {
        await pUserService.updatePublicUser("p_nric",new UpdatePublicUserDto());
        const user = new p_user();
        expect(pUserRepository.findOneAndUpdate({},user)).toBeDefined();
    });

});