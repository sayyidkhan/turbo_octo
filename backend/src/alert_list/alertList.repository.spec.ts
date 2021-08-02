import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {MongooseModule} from "@nestjs/mongoose";
import {AlertListRepository} from "./alertList.repository";
import {AlertListService} from "./alertList.service";
import {AlertListModule} from "./alertlist.module";
import {AlertList, AlertListSchema} from "./schemas/alertList.schema";
import exp = require("constants");


describe("alertList Repository", () => {
    let repository : AlertListRepository;
    let service : AlertListService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                AlertListModule,
                AppModule,
                MongooseModule.forFeature([ { name: AlertList.name, schema: AlertListSchema }]),
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

    it('test - find()', async () => {
        await service.getAllAlerts();
        expect(repository.find({})).toBeDefined();
    });

    it('test - findOne()', async () => {
        await service.getAlertById(123456);
        expect(repository.findOne({})).toBeDefined();
    });

    it("test - setAlertListId()", () => {
        const testObj = new AlertList();
        testObj.alertListId = 1;

        const postive_outcome = repository.setAlertListId([testObj]);
        expect(postive_outcome).toBe(1);

        const negative_outcome = repository.setAlertListId([]);
        expect(negative_outcome).toBe(0);
    });

    it('test - getMaxCtracingId()', async () => {
        await service.getMaxAlertListId();
        expect(repository.findOne({})).toBeDefined();
    });

    it('test - create()', async () => {
        const testObj = new AlertList();
        testObj.location_id = 123456;
        testObj.alertDate = new Date();
        testObj.alertListId = 1;
        testObj.alertTitle = 'title';
        testObj.alertDetail = 'detail';
        testObj.active = true;
        await service.createAlert(
            testObj.alertTitle,
            testObj.alertDetail,
            testObj.alertDate,
            testObj.active,
            testObj.location_id
            );
        expect(repository.create(testObj)).toBeDefined();
    });

    it("test findOneAndUpdate()", async () => {
        const testObj = new AlertList();
        testObj.location_id = 123456;
        testObj.alertDate = new Date();
        testObj.alertListId = 1;
        testObj.alertTitle = 'title';
        testObj.alertDetail = 'detail';
        testObj.active = true;
        await service.updateAlertById(testObj.alertListId,testObj);
        expect(repository.findOneAndUpdate({ alertListId : testObj.alertListId },testObj)).toBeDefined();
    });

    it("test deleteAlertListById()", async () => {
        const testObj = new AlertList();
        testObj.location_id = 123456;
        testObj['_id'] = testObj.location_id.toString();
        await service.deleteAlertListById(testObj.alertListId);

        let result = null;
        try {
            result = await repository.deleteAlertListById({ _id : testObj['_id'] });
        }
        catch (e) {
            result = null;
        }
        expect(result).toBeDefined();
    });


});