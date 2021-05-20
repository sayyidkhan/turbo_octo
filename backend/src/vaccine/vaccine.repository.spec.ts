import {VaccineRepository} from "./vaccine.repository";
import {VaccineService} from "./vaccine.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {MongooseModule} from "@nestjs/mongoose";
import {v_cert, VaccineSchema} from "./schemas/vaccine.schema";
import {VaccineModule} from "./vaccine.module";

describe("vaccine repository", () => {
    let repository : VaccineRepository;
    let service : VaccineService;

    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
            imports: [
                VaccineModule,
                AppModule,
                MongooseModule.forFeature([{ name: v_cert.name, schema: VaccineSchema }]),
            ],
            providers: [
                {
                    provide : VaccineRepository,
                    useValue : {
                        findOne : jest.fn(),
                        find : jest.fn(),
                        getMaxVaccineListId : jest.fn(),
                        create : jest.fn(),
                        findOneAndUpdate : jest.fn(),
                    }
                },
                VaccineService,
            ]
        }).compile();

        repository = module.get<VaccineRepository>(VaccineRepository);
        service = module.get<VaccineService>(VaccineService);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });

    it("test - verifyList() positive", () => {
        const vCert = new v_cert();
        vCert.v_cert_id = 1;
        const testCase = [vCert];

        const result = repository.verifyList(testCase);
        const testResult = result[0].v_cert_id;
        expect(testResult).toEqual(vCert.v_cert_id);
    });

    it("test - verifyList() negative", () => {
        const testCase = [];

        const result = repository.verifyList(testCase);
        expect(result).toEqual(testCase);
    });

    it('test - find()', async () => {
        await service.getAllVaccinationList();
        expect(repository.find({})).toBeDefined();
    });

    it('test - findOne()', async () => {
        await service.getVaccineByp_nric("p_nric");
        expect(repository.findOne({})).toBeDefined();
    });

    it('test - verifyList_LatestRecord() positive', async () => {
        const vCert = new v_cert();
        vCert.v_cert_id = 1;
        const testCase = [vCert];

        const result = repository.verifyList_LatestRecord(testCase);
        expect(result.v_cert_id).toEqual(vCert.v_cert_id);
    });

    it('test - verifyList_LatestRecord() negative', async () => {
        const testCase = [];

        const result = repository.verifyList_LatestRecord(testCase);
        expect(result).toBeNull();
    });

    it('test - getMaxVaccineListId()', async () => {
        await service.getMaxAlertListId();
        expect(repository.getMaxVaccineListId()).toBeDefined();
    });

    it('test - create()', async () => {
        await service.createVaccine("p_nric",new Date(),"e_nric");
        const cert = new v_cert();
        expect(repository.create(cert)).toBeDefined();
    });

    it("test - getLatestVaccinationRecordOnly()", async () => {
        await service.getLatestVaccinationRecordOnly("p_nric");
        expect(repository.getLatestVaccinationRecordOnly({})).toBeDefined();
    });

});