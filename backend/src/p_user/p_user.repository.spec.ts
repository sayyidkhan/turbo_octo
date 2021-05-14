import {P_UserService} from "./p_user.service";
import {P_UserRepository} from "./p_user.repository";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {p_user, P_UserSchema} from "./schemas/p_user.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {P_UserModule} from "./p_user.module";
import {UpdatePublicUserDto} from "./dto/update_public_user_dto";


describe("p_user Repository", () => {
   let repository : P_UserRepository;
   let service : P_UserService;

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

        service = module.get<P_UserService>(P_UserService);
        repository = module.get<P_UserRepository>(P_UserRepository);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });

    it('test - find()', async () => {
       await service.getP_User();
        expect(repository.find({})).toBeDefined();
    });

    it('test - findOne()', async () => {
        await service.getP_UserById("p_nric");
        expect(repository.findOne({})).toBeDefined();
    });

    it('test - create()', async () => {
        await service.createP_User("p_nric","firstname","lastname", true);
        const user = new p_user();
        expect(repository.create(user)).toBeDefined();
    });

    it('test - findOneAndUpdate()', async () => {
        await service.updatePublicUser("p_nric",new UpdatePublicUserDto());
        const user = new p_user();
        expect(repository.findOneAndUpdate({},user)).toBeDefined();
    });

});