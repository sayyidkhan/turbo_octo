import {c_tracing} from "./schemas/ctracing.schema";
import {CtracingRepository} from "./ctracing.repository";
import {CtracingService} from "./ctracing.service";
import {Test, TestingModule} from "@nestjs/testing";
import {CtracingModule} from "./ctracing.module";
import {AppModule} from "../app.module";
import {ViewCtracingDto} from "./dto/view-ctracing.dto";
import {Ctracing_reportService} from "./ctracing_report.service";
import {LocationModule} from "../location/location.module";
import {LocationService} from "../location/location.service";
import {ReportMonthlyComputeCtracingDto, ReportWeeklyQueryCtracingDto} from "./dto/report-ctracing.dto";
import {Location} from "../location/schemas/location.schema";

class Ctracing_ReportServiceMock {
    getCt_id() : number {
        return 1;
    }
    getP_nric() : string {
        return "p_nric";
    }
    getOneC_tracing() {
        const ctracing = new c_tracing();
        ctracing.p_nric = this.getP_nric();
        ctracing.ct_id = this.getCt_id();
        ctracing.date = new Date();
        ctracing.ct_id = 1;
        ctracing.location_id = 123456;
        return ctracing;
    }
    getCtracingList() {
        return [this.getOneC_tracing()];
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

describe("ctracing report Service", () => {
    let service: CtracingService;
    let reportservice: Ctracing_reportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CtracingModule,
                LocationModule,
                AppModule,
            ],
            providers: [
                {
                    provide: CtracingService,
                    useValue: {
                        getCtracingByDates: jest.fn(),
                        getCtracingByMonthOnly: jest.fn(),
                    }
                },
                {
                    provide: LocationService,
                    useValue: {
                        getAllLocationDict: jest.fn(),
                    }
                },
                Ctracing_reportService,
            ],
        }).compile();

        service = module.get<CtracingService>(CtracingService);
        reportservice = module.get<Ctracing_reportService>(Ctracing_reportService);
    });

    afterEach(async () => {
        reportservice = null;
        service = null;
    });

    it('test - sortRecordsByMonth()', async () => {
        const locationDict = new Ctracing_ReportServiceMock().getAllLocationDict();
        const testCase = new Ctracing_ReportServiceMock().getOneC_tracing();
        testCase.date.setMonth(2);
        const calendar_dict = {
            3 : {
                myList : [],
                total_amount : 0,
                north : 0,
                south : 0,
                east : 0,
                west : 0
            }
        };

        const result = await reportservice.sortRecordsByMonth([testCase],calendar_dict,locationDict);
        expect(result).toBeDefined();
    });

    it("test - generateMonthlyReport() (positive)", async () => {
        const dto : ReportMonthlyComputeCtracingDto = new ReportMonthlyComputeCtracingDto(
            "2021-09-05",
            "2021-10-05",
        );

        const testCase = new Ctracing_ReportServiceMock().getCtracingList();

        service.getCtracingByDates = jest.fn().mockReturnValue(testCase);
        reportservice.sortRecordsByMonth = jest.fn().mockReturnValue(testCase);
        const result = await reportservice.generateMonthlyReport(dto);
        expect(result).toEqual(testCase);
    });

    it("test - generateMonthlyReport() (negative)", async () => {
        const dto : ReportMonthlyComputeCtracingDto = new ReportMonthlyComputeCtracingDto(
            "2021-09-05",
            "2021-10-05",
        );

        service.getCtracingByDates = jest.fn().mockReturnValue([]);
        reportservice.sortRecordsByMonth = jest.fn().mockReturnValue({});
        const result = await reportservice.generateMonthlyReport(dto);
        expect(result).toEqual({});
    });

    it('test - sortRecordsByWeek()', async () => {
        const locationDict = new Ctracing_ReportServiceMock().getAllLocationDict();
        const testCase = new Ctracing_ReportServiceMock().getOneC_tracing();
        testCase.date.setDate(1);
        const calendar_dict = {
            1 : {
                myList : [],
                week : 0,
                total_amount : 0,
                north : 0,
                south : 0,
                east : 0,
                west : 0
            }
        };

        const result = await reportservice.sortRecordsByWeek([testCase],calendar_dict,locationDict);
        expect(result).toBeDefined();
    });

    it('test - generateWeeklyReport() (positive)', async () => {
        const dto : ReportWeeklyQueryCtracingDto = new ReportWeeklyQueryCtracingDto(
            5,
            2021,
        );

        const testCase = new Ctracing_ReportServiceMock().getCtracingList();

        service.getCtracingByMonthOnly = jest.fn().mockReturnValue(testCase);
        reportservice.sortRecordsByWeek = jest.fn().mockReturnValue(testCase);
        const result = await reportservice.generateWeeklyReport(dto);
        expect(result).toEqual(testCase);
    });

    it('test - generateWeeklyReport() (negative)', async () => {
        const dto : ReportWeeklyQueryCtracingDto = new ReportWeeklyQueryCtracingDto(
            5,
            2021,
        );

        service.getCtracingByMonthOnly = jest.fn().mockReturnValue([]);
        reportservice.sortRecordsByWeek = jest.fn().mockReturnValue({});
        const result = await reportservice.generateWeeklyReport(dto);
        expect(result).toEqual({});
    });

});