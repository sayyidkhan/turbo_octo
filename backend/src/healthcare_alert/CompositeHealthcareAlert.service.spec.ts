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
import {E_UserModule} from "../e_user/e_User.module";
import {E_UserService} from "../e_user/e_User.service";
import {E_User} from "../e_user/schemas/e_user.schema";
import {CreateHealthcareAlertsDto} from "./dto/create-healthcareAlerts.dto";

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
    let e_UserService : E_UserService;

    const mockGetEnterpriseUserById = jest.fn();
    const mockGetAllLocationDict = jest.fn();
    const mockGetLocationById = jest.fn();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                HealthcareAlertModule,
                E_UserModule,
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
                        getAllLocationDict : mockGetAllLocationDict,
                        getLocationById : mockGetLocationById,
                    }
                },
                {
                    provide : E_UserService,
                    useValue : {
                        getEnterpriseUserById : mockGetEnterpriseUserById,
                    }
                },
                CompositeHealthcareAlertService,
            ]
        }).compile();

        e_UserService = module.get<E_UserService>(E_UserService);
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

    it('test - createNewHealthcareAlerts() (positive)', async () => {
        const locationMock = new CompositeHealthcareServiceMock().getAllLocationDict();
        delete locationMock[123456];

        const dto = new CreateHealthcareAlertsDto();
        dto.date = new Date().toISOString();
        dto.location_id = 123456;
        dto.description = "description";
        dto.e_nric = "e_nric";

        mockGetEnterpriseUserById.mockReturnValue(new E_User());
        locationService.getLocationById = jest.fn().mockReturnValue(new Location());
        const result: string | CreateHealthcareAlertsDto = await compositeHealthcareAlertService.createNewHealthcareAlerts(dto);
        expect(result !== null).toBeTruthy();
    });

    it('test - createNewHealthcareAlerts() (negative scenario - 1)', async () => {
        const locationMock = new CompositeHealthcareServiceMock().getAllLocationDict();
        delete locationMock[123456];

        const dto = new CreateHealthcareAlertsDto();
        dto.date = "";
        dto.location_id = 123456;
        dto.description = "description";
        dto.e_nric = "e_nric";

        mockGetEnterpriseUserById.mockReturnValue(new E_User());
        locationService.getLocationById = jest.fn().mockReturnValue(new Location());
        const result: string | CreateHealthcareAlertsDto = await compositeHealthcareAlertService.createNewHealthcareAlerts(dto);
        expect(result).toEqual("date is invalid. please review the date string before sending.");
    });

    it('test - createNewHealthcareAlerts() (negative scenario - 2)', async () => {
        const locationMock = new CompositeHealthcareServiceMock().getAllLocationDict();
        delete locationMock[123456];

        const dto = new CreateHealthcareAlertsDto();
        dto.date = new Date().toISOString();
        dto.location_id = 123456;
        dto.description = "description";
        dto.e_nric = "e_nric";

        e_UserService.getEnterpriseUserById = jest.fn().mockReturnValue(null);
        locationService.getLocationById = jest.fn().mockReturnValue(new Location());
        const result: string | CreateHealthcareAlertsDto = await compositeHealthcareAlertService.createNewHealthcareAlerts(dto);
        expect(result).toEqual("enterpise nric invalid. user is trying to enter enterprise nric which doesnt exist in record.");
    });

    it('test - createNewHealthcareAlerts() (negative scenario - 3)', async () => {
        const locationMock = new CompositeHealthcareServiceMock().getAllLocationDict();
        delete locationMock[123456];

        const dto = new CreateHealthcareAlertsDto();
        dto.date = new Date().toISOString();
        dto.location_id = 123456;
        dto.description = "description";
        dto.e_nric = "e_nric";

        e_UserService.getEnterpriseUserById = jest.fn().mockReturnValue(new E_User());
        locationService.getLocationById = jest.fn().mockReturnValue(null);
        const result: string | CreateHealthcareAlertsDto = await compositeHealthcareAlertService.createNewHealthcareAlerts(dto);
        expect(result).toEqual("location is invalid. please review the location id before sending.");
    });

});