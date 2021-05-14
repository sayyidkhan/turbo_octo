import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {MongooseModule} from "@nestjs/mongoose";
import {HealthCareAlertRepository} from "./healthcareAlert.repository";
import {HealthcareAlertService} from "./healthcareAlert.service";
import {HealthcareAlertModule} from "./healthcareAlert.module";
import {HealthcareAlert, HealthcareAlertSchema} from "./schemas/healthcareAlert.schema";
import {PersistUpdateHealthcareAlertsDto, UpdateHealthcareAlertsDto} from "./dto/update-healthcareAlerts.dto";

describe("alertList Repository", () => {
    let repository : HealthCareAlertRepository;
    let service : HealthcareAlertService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                HealthcareAlertModule,
                AppModule,
                MongooseModule.forFeature([ { name: HealthcareAlert.name, schema: HealthcareAlertSchema }]),
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
        await service.getAllHealthcareAlerts();
        expect(repository.find({})).toBeDefined();
    });

    it('test - findOne()', async () => {
        await service.getHealthcareAlertByID(123456);
        expect(repository.findOne({})).toBeDefined();
    });

    it('test - getMaxCtracingId()', async () => {
        await service.getMaxAlertListId();
        expect(repository.findOne({})).toBeDefined();
    });

    it('test - create()', async () => {
        const testObj = new HealthcareAlert();
        testObj.location_id = 123456;
        testObj.date = new Date();
        testObj.healthcareAlertId = 1;
        testObj.description = "description";
        testObj.e_nric = "e_nric";

        await service.createNewHealthcareAlerts(
            testObj.date,
            testObj.location_id,
            testObj.description,
            testObj.e_nric,
        );
        expect(repository.create(testObj)).toBeDefined();
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
        const persistence = new PersistUpdateHealthcareAlertsDto(dto);

        await service.updateHealthcareAlertByID(testObj.healthcareAlertId,dto);
        expect(repository.findOneAndUpdate({ healthcareAlertId : testObj.healthcareAlertId },persistence)).toBeDefined();
    });

    it('test - checkEmptyArray()',async () => {
        const healthcareAlert = new HealthcareAlert();
        healthcareAlert.healthcareAlertId = 123456;
        //check empty array
        repository.checkEmptyArray([]);
        expect(repository.checkEmptyArray([])).toEqual(0);
        //check array with value
        const result = repository.checkEmptyArray([healthcareAlert]);
        expect(result).toEqual(healthcareAlert.healthcareAlertId);
    });

});