import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {HealthcareAlertService} from "./healthcareAlert.service";
import {HealthcareAlertModule} from "./healthcareAlert.module";
import {HealthcareAlert} from "./schemas/healthcareAlert.schema";
import {LocationService} from "../location/location.service";
import {LocationModule} from "../location/location.module";
import {Location} from "../location/schemas/location.schema";
import {CompositeHealthcareAlertService} from "./CompositeHealthcareAlert.service";
import {ViewHealthcareAlertsDto} from "./dto/view-healthcareAlerts.dto";

class CompositeHealthcareServiceMock {
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
    getAllLocationDict() : {} {
        const location = new Location();
        location.location_id = 123456;
        location.location_name = "location_name_1";
        location.district = "west";

        const myDict = {};
        const locationDict = {
            "locationId": location.location_id,
            "location_name": location.location_name,
            "district": location.district,
        };
        myDict[location.location_id] = locationDict;
        return myDict;
    }
}

describe("composite healthcare Service", () => {
    let healthcareAlertService : HealthcareAlertService;
    let locationService : LocationService;
    let compositeHealthcareAlertService : CompositeHealthcareAlertService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                HealthcareAlertModule,
                LocationModule,
                AppModule,
            ],
            providers : [
                {
                    provide : HealthcareAlertService,
                    useValue : {
                        getAllHealthcareAlerts : jest.fn(),
                    }
                },
                {
                    provide : LocationService,
                    useValue : {
                        getAllLocationDict : jest.fn(),
                    }
                },
                CompositeHealthcareAlertService,
            ]
        }).compile();

        locationService = module.get<LocationService>(LocationService);
        healthcareAlertService = module.get<HealthcareAlertService>(HealthcareAlertService);
        compositeHealthcareAlertService = module.get<CompositeHealthcareAlertService>(CompositeHealthcareAlertService);
    });

    afterEach(async () => {
        locationService = null;
        healthcareAlertService = null;
        compositeHealthcareAlertService = null;
    });

    it('test - getAllHealthcareAlertsDTO()', async () => {
        const testCase = new CompositeHealthcareServiceMock().getAllHealthcareRecord();
        const locationDict = new CompositeHealthcareServiceMock().getAllLocationDict();

        healthcareAlertService.getAllHealthcareAlerts = jest.fn().mockReturnValue(testCase);
        locationService.getAllLocationDict = jest.fn().mockReturnValue(locationDict);
        const result = await compositeHealthcareAlertService.getAllHealthcareAlertsDTO();
        expect(result.length).toEqual(1);
    });

    it('test - getAllAlertListDTO() positive', async () => {
        const testCase = new CompositeHealthcareServiceMock().getAllHealthcareRecord();
        const locationMock = new CompositeHealthcareServiceMock().getAllLocationDict();

        healthcareAlertService.getAllHealthcareAlerts = jest.fn().mockReturnValue(testCase);
        locationService.getAllLocationDict = jest.fn().mockReturnValue(locationMock);
        const result: ViewHealthcareAlertsDto[] = await compositeHealthcareAlertService.getAllHealthcareAlertsDTO();
        expect(result[0].e_nric).toEqual(testCase[0].e_nric);
    });


    it('test - getAllAlertListDTO() negative', async () => {
        const testCase: HealthcareAlert[] = new CompositeHealthcareServiceMock().getAllHealthcareRecord();
        const locationMock = new CompositeHealthcareServiceMock().getAllLocationDict();
        delete locationMock[123456];

        healthcareAlertService.getAllHealthcareAlerts = jest.fn().mockReturnValue(testCase);
        locationService.getAllLocationDict = jest.fn().mockReturnValue(locationMock);
        const result: ViewHealthcareAlertsDto[] = await compositeHealthcareAlertService.getAllHealthcareAlertsDTO();
        expect(result[0].e_nric).toEqual(testCase[0].e_nric);
    });

});