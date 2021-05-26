import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {HealthCareAlertRepository} from "./healthcareAlert.repository";
import {HealthcareAlertService} from "./healthcareAlert.service";
import {HealthcareAlertModule} from "./healthcareAlert.module";
import {HealthcareAlert} from "./schemas/healthcareAlert.schema";
import {UpdateHealthcareAlertsDto} from "./dto/update-healthcareAlerts.dto";

class HealthcareServiceMock {
    getOneHealthcareRecord() {
        const healthcare = new HealthcareAlert();
        healthcare.e_nric = "e_nric";
        healthcare.description = "description";
        healthcare.location_id = 123456;
        healthcare.healthcareAlertId = 1;
        healthcare.date = new Date();
        return healthcare;
    }
    getAllHealthcareRecord() {
        return [this.getOneHealthcareRecord()];
    }
}

describe("healthcare Service", () => {
    let repository : HealthCareAlertRepository;
    let service : HealthcareAlertService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                HealthcareAlertModule,
                AppModule,
            ],
            providers : [
                {
                    provide : HealthCareAlertRepository,
                    useValue : {
                        find : jest.fn(),
                        findOne : jest.fn(),
                    }
                },
                HealthcareAlertService,
            ]
        }).compile();

        service = module.get<HealthcareAlertService>(HealthcareAlertService);
        repository = module.get<HealthCareAlertRepository>(HealthCareAlertRepository);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });

    it('test - find()', async () => {
        const testCase = new HealthcareServiceMock().getAllHealthcareRecord();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getAllHealthcareAlerts();
        expect(result).toEqual(testCase);
    });

    it('test - findOne()', async () => {
        const testCase = new HealthcareServiceMock().getOneHealthcareRecord();

        repository.findOne = jest.fn().mockReturnValue(testCase);
        const result = await service.getHealthcareAlertByID(123456);
        expect(result).toEqual(testCase);
    });

    it('test - getMaxCtracingId()', async () => {
        const testCase = new HealthcareServiceMock().getOneHealthcareRecord().healthcareAlertId;

        repository.getMaxAlertListId = jest.fn().mockReturnValue(testCase);
        const result = await service.getMaxAlertListId();
        expect(result).toEqual(testCase);
    });

    it('test - setHealthCareId()', async () => {
        const result_positive = service.setHealthCareId(1);
        expect(result_positive).toBe(2);
        const result_negative = service.setHealthCareId(0);
        expect(result_negative).toBe(1)
    });

    it('test - create()', async () => {
        const testObj = new HealthcareAlert();
        testObj.location_id = 123456;
        testObj.date = new Date();
        testObj.healthcareAlertId = 1;
        testObj.description = "description";
        testObj.e_nric = "e_nric";

        repository.create = jest.fn().mockReturnValue(testObj);
        const result = await service.createNewHealthcareAlerts(
            testObj.date,
            testObj.location_id,
            testObj.description,
            testObj.e_nric,
        );
        expect(result.healthcareAlertId).toEqual(testObj.healthcareAlertId);
    });

    it("test findOneAndUpdate()", async () => {
        const testObj = new HealthcareAlert();
        testObj.location_id = 123456;
        testObj.date = new Date();
        testObj.healthcareAlertId = 1;
        testObj.description = "description";
        testObj.e_nric = "e_nric";
        const dto = new UpdateHealthcareAlertsDto();
        dto.date = testObj.date.toISOString();

        repository.findOneAndUpdate = jest.fn().mockReturnValue(testObj);
        const result = await service.updateHealthcareAlertByID(testObj.healthcareAlertId,dto);
        expect(result.healthcareAlertId).toEqual(testObj.healthcareAlertId);
    });

});