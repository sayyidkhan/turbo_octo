// import {Test, TestingModule} from '@nestjs/testing';
// import {AlertListController} from './alertList.controller';
// import {AlertListService} from './alertList.service';
// import {AlertListRepository} from "./alertList.repository";
//
//
// describe('AlertListController', () =>{
//
//     let alertListController: AlertListController;
//
//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             controllers: [AlertListController],
//             providers: [AlertListService, AlertListRepository],
//         }).compile();
//
//         alertListController = module.get<AlertListController>(AlertListController);
//     });
//
//
//     describe("root",() => {
//         it('test getAllAlertsList()', async () => {
//
//
//             const testResult = await alertListController.getAllAlertList();
//             console.log(testResult);
//             expect(testResult !== null).toBeTruthy();
//         });
//     });
//
// });



import {AlertListController} from "./alertList.controller";
import {AlertListService} from "./alertList.service";
import {AlertListRepository} from "./alertList.repository";
import {AlertList} from "./schemas/alertList.schema";

describe('CatsController', () => {
    let alertListController : AlertListController;
    let alertListService : AlertListService;
    let alertListRespository : AlertListRepository;

    beforeEach(() => {
        alertListService = new AlertListService(null);
        alertListController = new AlertListController(alertListService);
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const myObj = new AlertList();
            const myList : AlertList[] = [myObj];
            jest.spyOn(alertListService, 'getAllAlerts').mockImplementation(() => null );

            expect(await alertListController.getAllAlertList()).toEqual(null);
        });
    });
});

