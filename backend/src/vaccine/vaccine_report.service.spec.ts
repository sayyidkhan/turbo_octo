import {VaccineService} from "./vaccine.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {v_cert} from "./schemas/vaccine.schema";
import {VaccineModule} from "./vaccine.module";
import {Vaccine_reportService} from "./vaccine_report.service";
import {ReportMonthlyComputeCtracingDto, ReportWeeklyQueryCtracingDto} from "../ctracing/dto/report-ctracing.dto";

class Vaccine_ReportServiceMock {
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

describe("vaccine report service", () => {
    let service : VaccineService;
    let reportService : Vaccine_reportService;

    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
            imports: [
                VaccineModule,
                AppModule,
            ],
            providers: [
                {
                    provide : VaccineService,
                    useValue : {
                        getVaccineByDates : jest.fn(),
                    }
                },
                Vaccine_reportService,
            ]
        }).compile();

        service = module.get<VaccineService>(VaccineService);
        reportService = module.get<Vaccine_reportService>(Vaccine_reportService);
    });

    afterEach(async () => {
        reportService = null;
        service = null;
    });

    it('test - sortRecordsByMonth()', async () => {
        const testCase = new Vaccine_ReportServiceMock().getOneVaccine();
        testCase.v_date.setMonth(4);
        const calendar_dict = {
            "5" : {
                myList : [],
                total_amount : 0,
            }
        };

        const result = await reportService.sortRecordsByMonth([testCase],calendar_dict);
        expect(result).toBeDefined();
    });

    it('test - generateMonthlyReport() (positive)', async () => {
        const dto : ReportMonthlyComputeCtracingDto = new ReportMonthlyComputeCtracingDto(
            "2021-09-05",
            "2021-10-05",
        );

        const testCase = new Vaccine_ReportServiceMock().getVaccinesList()

        service.getVaccineByDates = jest.fn().mockReturnValue(testCase);
        reportService.sortRecordsByMonth = jest.fn().mockReturnValue(testCase);
        const result = await reportService.generateMonthlyReport(dto);
        expect(result).toEqual(testCase);
    });

    it('test - generateMonthlyReport() (negative)', async () => {
        const dto : ReportMonthlyComputeCtracingDto = new ReportMonthlyComputeCtracingDto(
            "2021-09-05",
            "2021-10-05",
        );

        service.getVaccineByDates = jest.fn().mockReturnValue([]);
        const result = await reportService.generateMonthlyReport(dto);
        expect(result).toEqual({});
    });

    it('test - sortRecordsByWeek()', async () => {
        const testCase = new Vaccine_ReportServiceMock().getOneVaccine();
        testCase.v_date.setDate(1);
        const calendar_dict = {
            "1" : {
                myList : [],
                total_amount : 0,
            }
        };

        const result = await reportService.sortRecordsByWeek([testCase],calendar_dict);
        expect(result).toBeDefined();
    });


    it('test - generateWeeklyReport() (positive)', async () => {
        const dto : ReportWeeklyQueryCtracingDto = new ReportWeeklyQueryCtracingDto(
            5,
            2021,
        );

        const testCase = new Vaccine_ReportServiceMock().getVaccinesList();

        service.getVaccineByMonthOnly = jest.fn().mockReturnValue(testCase);
        reportService.sortRecordsByWeek = jest.fn().mockReturnValue(testCase);
        const result = await reportService.generateWeeklyReport(dto);
        expect(result).toEqual(testCase);
    })

    it('test - generateWeeklyReport() (negative)', async () => {
        const dto : ReportWeeklyQueryCtracingDto = new ReportWeeklyQueryCtracingDto(
            5,
            2021,
        );

        service.getVaccineByMonthOnly = jest.fn().mockReturnValue([]);
        reportService.sortRecordsByWeek = jest.fn().mockReturnValue({});
        const result = await reportService.generateWeeklyReport(dto);
        expect(result).toEqual({});
    });


});