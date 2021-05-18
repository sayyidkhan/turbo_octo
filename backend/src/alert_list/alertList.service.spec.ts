import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {AlertListRepository} from "./alertList.repository";
import {AlertListService} from "./alertList.service";
import {AlertListModule} from "./alertlist.module";
import {AlertList} from "./schemas/alertList.schema";

class AlertListServiceMock {
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
}

describe("alertList Service", () => {
    let repository : AlertListRepository;
    let service : AlertListService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                AlertListModule,
                AppModule,
            ],
            providers : [
                {
                    provide : AlertListRepository,
                    useValue : {
                        find : jest.fn(),
                        findOne : jest.fn(),
                        findByIdAndRemove : jest.fn(),
                        checkEmptyArray : jest.fn(),
                    }
                },
                AlertListService,
            ]
        }).compile();

        service = module.get<AlertListService>(AlertListService);
        repository = module.get<AlertListRepository>(AlertListRepository);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });

    it('test - getAllAlerts()', async () => {
        const testCase = new AlertListServiceMock().getAlertLists();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getAllAlerts();
        expect(result[0].alertListId).toEqual(testCase[0].alertListId);
    });

    it('test - getAlertById()', async () => {
        const testCase = new AlertListServiceMock().getOneAlertList();

        repository.findOne = jest.fn().mockReturnValue(testCase);
        const result = await service.getAlertById(123456);
        expect(result.alertListId).toEqual(testCase.alertListId);
    });

    it('test - getAlertsWithQuery()', async () => {
        const testCase = new AlertListServiceMock().getAlertLists();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getAlertsWithQuery({});
        expect(result[0].alertListId).toEqual(testCase[0].alertListId);
    });

    it('test - getMaxCtracingId()', async () => {
        const testCase = new AlertListServiceMock().getAlertLists();

        repository.getMaxAlertListId = jest.fn().mockReturnValue(testCase[0].alertListId);
        const result = await service.getMaxAlertListId();
        expect(result).toEqual(testCase[0].alertListId);
    });

    it('test - createAlert()', async () => {
        const testCase = new AlertListServiceMock().getOneAlertList();

        repository.create = jest.fn().mockReturnValue(testCase);
        const result = await service.createAlert(
            testCase.alertTitle,
            testCase.alertDetail,
            testCase.alertDate,
            testCase.active,
            testCase.location_id
        );
        expect(result.alertListId).toEqual(testCase.alertListId);
    });

    it("test updateAlertById()", async () => {
        const testCase = new AlertListServiceMock().getOneAlertList();

        repository.findOneAndUpdate = jest.fn().mockReturnValue(testCase);
        const result = await service.updateAlertById(testCase.alertListId,testCase);
        expect(result.alertListId).toEqual(testCase.alertListId);
    });

    it("test deleteAlertListById() - positive", async () => {
        const testCase = new AlertListServiceMock().getOneAlertList();
        testCase['_id'] = testCase.alertListId;

        repository.deleteAlertListById = jest.fn().mockReturnValue(testCase);
        const result = await service.deleteAlertListById(testCase.alertListId);
        expect(result).toEqual(testCase);
    });

    it("test deleteAlertListById() - negative", async () => {
        const testCase = new AlertListServiceMock().getOneAlertList();
        testCase['_id'] = testCase.alertListId;

        repository.findOne = jest.fn().mockReturnValue(null);
        const result = await service.deleteAlertListById(testCase.alertListId);
        expect(result).toEqual(null);
    });


});