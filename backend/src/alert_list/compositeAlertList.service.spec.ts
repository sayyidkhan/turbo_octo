import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {AlertListRepository} from "./alertList.repository";
import {AlertListService} from "./alertList.service";
import {AlertListModule} from "./alertlist.module";
import {AlertList} from "./schemas/alertList.schema";
import {LocationModule} from "../location/location.module";
import {LocationService} from "../location/location.service";
import {CompositeAlertListService} from "./compositeAlertList.service";
import {ViewAlertListDto} from "./dto/alert-list.dto";
import {P_userAlertListDto} from "./dto/p_user-alert-list.dto";

class CompositeAlertListServiceMock {
    getOneAlertList() : AlertList {
        const alert_list = new AlertList();
        alert_list.alertListId = 1;
        alert_list.location_id = 123456;
        alert_list.active = true;
        alert_list.alertTitle = "title";
        alert_list.alertDetail = "detail";
        alert_list.alertDate = new Date();
        return alert_list;
    }
    getAlertLists() : AlertList[] {
        return [this.getOneAlertList()];
    }
    getLocationList() {
        const locationDict = {};
        const location = {
            location_id : 123456,
            location_name : "location_name",
            district : 'district',
        };
        locationDict[123456] = location;
        return locationDict;
    }
}

describe("composite alertList Service", () => {
    let alertService : AlertListService;
    let locationService : LocationService;
    let compositeAlertListService : CompositeAlertListService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                AlertListModule,
                LocationModule,
                AppModule,
            ],
            providers : [
                {
                    provide : AlertListService,
                    useValue : {
                        getAllAlerts : jest.fn(),
                    }
                },
                {
                    provide : LocationService,
                    useValue : {
                        getAllLocationDict : jest.fn(),
                    }
                },
                CompositeAlertListService,
            ]
        }).compile();

        locationService = module.get<LocationService>(LocationService);
        alertService = module.get<AlertListService>(AlertListService);
        compositeAlertListService = module.get<CompositeAlertListService>(CompositeAlertListService);
    });

    afterEach(async () => {
        locationService = null;
        alertService = null;
        compositeAlertListService = null;
    });

    it('test - getOnlyActiveAlerts()', async () => {
        const testCase = new CompositeAlertListServiceMock().getAlertLists();
        const locationMock = new CompositeAlertListServiceMock().getLocationList();

        alertService.getAlertsWithQuery = jest.fn().mockReturnValue(testCase);
        locationService.getAllLocationDict = jest.fn().mockReturnValue(locationMock);
        const result: P_userAlertListDto[] = await compositeAlertListService.getOnlyActiveAlerts();
        expect(result[0].alertListId).toEqual(testCase[0].alertListId);
    });

    it('test - getAllAlertListDTO() positive', async () => {
        const testCase = new CompositeAlertListServiceMock().getAlertLists();
        const locationMock = new CompositeAlertListServiceMock().getLocationList();

        alertService.getAllAlerts = jest.fn().mockReturnValue(testCase);
        locationService.getAllLocationDict = jest.fn().mockReturnValue(locationMock);
        const result: ViewAlertListDto[] = await compositeAlertListService.getAllAlertListDTO();
        expect(result[0].alertListId).toEqual(testCase[0].alertListId);
    });


    it('test - getAllAlertListDTO() negative', async () => {
        const testCase = new CompositeAlertListServiceMock().getAlertLists();
        const locationMock = new CompositeAlertListServiceMock().getLocationList();
        delete locationMock[123456];

        alertService.getAllAlerts = jest.fn().mockReturnValue(testCase);
        locationService.getAllLocationDict = jest.fn().mockReturnValue(locationMock);
        const result: ViewAlertListDto[] = await compositeAlertListService.getAllAlertListDTO();
        expect(result[0].alertListId).toEqual(testCase[0].alertListId);
    });

    it('test - getAlertListByLocationId()', async () => {
        const testCase = new CompositeAlertListServiceMock().getAlertLists();
        const locationMock = new CompositeAlertListServiceMock().getLocationList();

        alertService.getAlertsWithQuery = jest.fn().mockReturnValue(testCase);
        locationService.getAllLocationDict = jest.fn().mockReturnValue(locationMock);
        const result: P_userAlertListDto[] = await compositeAlertListService.getAlertListByLocationId(123456);
        expect(result[0].alertListId).toEqual(testCase[0].alertListId);
    });

    it('test - getAlertListByDistrict()', async () => {
        const testCase = new CompositeAlertListServiceMock().getAlertLists();
        const locationMock = new CompositeAlertListServiceMock().getLocationList();

        alertService.getAllAlerts = jest.fn().mockReturnValue(testCase);
        locationService.getLocationByDistrict = jest.fn().mockReturnValue(locationMock);
        const result: P_userAlertListDto[] = await compositeAlertListService.getAlertListByDistrict("west");
        expect(result[0].alertListId).toEqual(testCase[0].alertListId);
    });

});