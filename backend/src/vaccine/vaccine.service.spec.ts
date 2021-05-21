import {VaccineRepository} from "./vaccine.repository";
import {VaccineService} from "./vaccine.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {v_cert} from "./schemas/vaccine.schema";
import {VaccineModule} from "./vaccine.module";

class VaccineServiceMock {
    getOneVaccine(): v_cert {
        const vaccine = new v_cert();
        vaccine.p_nric = 'p_nric';
        vaccine.v_cert_id = 1;
        vaccine.e_nric = 'e_nric';
        vaccine.v_date = new Date();
        return vaccine;
    }
    getVaccinesList(): v_cert[] {
        return [this.getOneVaccine()];
    }
}

describe("vaccine service", () => {
    let repository : VaccineRepository;
    let service : VaccineService;

    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
            imports: [
                VaccineModule,
                AppModule,
            ],
            providers: [
                {
                    provide : VaccineRepository,
                    useValue : {
                        findOne : jest.fn(),
                        find : jest.fn(),
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

    it('test - getAllVaccinationList()', async () => {
        const testCase = new VaccineServiceMock().getVaccinesList();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getAllVaccinationList();
        expect(result).toEqual(testCase);
    });

    it('test - getVaccineById()', async () => {
        const testCase = new VaccineServiceMock().getOneVaccine();

        repository.findOne = jest.fn().mockReturnValue(testCase);
        const result = await service.getVaccineById(testCase.v_cert_id);
        expect(result).toEqual(testCase);
    });

    it('test - getLatestVaccinationRecordOnly()', async () => {
        const testCase = new VaccineServiceMock().getOneVaccine();

        repository.getLatestVaccinationRecordOnly = jest.fn().mockReturnValue(testCase);
        const result = await service.getLatestVaccinationRecordOnly(testCase.p_nric);
        expect(result).toEqual(testCase);
    });

    it('test - getVaccineByp_nric()', async () => {
        const testCase = new VaccineServiceMock().getVaccinesList();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getVaccineByp_nric(testCase[0].p_nric);
        expect(result).toEqual(testCase);
    });

    it('test - getVaccineBye_nric()', async () => {
        const testCase = new VaccineServiceMock().getVaccinesList();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getVaccineBye_nric(testCase[0].e_nric);
        expect(result).toEqual(testCase);
    });

    it('test - getMaxAlertListId()', async () => {
        const testCase = new VaccineServiceMock().getOneVaccine();

        repository.getMaxVaccineListId = jest.fn().mockReturnValue(testCase.v_cert_id);
        const result = await service.getMaxAlertListId();
        expect(result).toEqual(testCase.v_cert_id);
    });

    it('test - getVaccineByDates()', async () => {
        const testCase = new VaccineServiceMock().getVaccinesList();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getVaccineByDates(new Date(),new Date());
        expect(result).toEqual(testCase);
    });

    it('test - getVaccineByMonthOnly()', async () => {
        const testCase = new VaccineServiceMock().getVaccinesList();
        const date = new Date();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getVaccineByMonthOnly(date.getMonth(),date.getFullYear());
        expect(result).toEqual(testCase);
    });

    it('test - createVaccine()', async () => {
        const testCase = new VaccineServiceMock().getOneVaccine();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.createVaccine(testCase.p_nric,testCase.v_date,testCase.e_nric);
        expect(result.p_nric).toEqual(testCase.p_nric);
    });




});