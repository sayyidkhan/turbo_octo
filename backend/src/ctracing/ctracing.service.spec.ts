import {c_tracing} from "./schemas/ctracing.schema";
import {CtracingRepository} from "./ctracing.repository";
import {CtracingService} from "./ctracing.service";
import {Test, TestingModule} from "@nestjs/testing";
import {CtracingModule} from "./ctracing.module";
import {AppModule} from "../app.module";
import {ViewCtracingDto} from "./dto/view-ctracing.dto";

class CtracingServiceMock {
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
}

describe("ctracing Service", () => {
    let repository: CtracingRepository;
    let service: CtracingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CtracingModule,
                AppModule,
            ],
            providers: [
                {
                    provide: CtracingRepository,
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        findAndSortByLatestId : jest.fn(),
                    }
                }
            ],
        }).compile();

        repository = module.get<CtracingRepository>(CtracingRepository);
        service = module.get<CtracingService>(CtracingService);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });


    it("E_UserService - should be defined", () => {
        expect(service).toBeDefined();
    });

    it("test - getCtracingByLatestId()", async () => {
        const testCase = new CtracingServiceMock().getCtracingList();

        repository.findAndSortByLatestId = jest.fn().mockReturnValue(testCase);
        const result = await service.getCtracingByLatestId();
        expect(result).toEqual(testCase);
    });

    it("test - getCtracingByLocationID()", async () => {
        const testCase = new CtracingServiceMock().getCtracingList();

        repository.findAndSortByLatestId = jest.fn().mockReturnValue(testCase);
        const result = await service.getCtracingByLocationID(123456);
        expect(result).toEqual(testCase);
    });

    it("test - getCtracingById()", async () => {
       const testCase = new CtracingServiceMock().getOneC_tracing();

        repository.findOne = jest.fn().mockReturnValue(testCase);
        const result = await service.getCtracingById(testCase.ct_id);
        expect(result).toEqual(testCase);
    });

    it("test - getMaxCtracingId()", async () => {
        const testCase = new CtracingServiceMock().getCt_id();

        repository.getMaxCtracingId = jest.fn().mockReturnValue(testCase);
        const result = await service.getMaxCtracingId();
        expect(result).toEqual(testCase);
    });

    it("test - createCTracing()", async () => {
        const testCase = new CtracingServiceMock().getOneC_tracing();

        repository.create = jest.fn().mockReturnValue(testCase);
        const result = await service.createCtracing("p_nric",testCase.location_id,testCase.date);
        expect(result).toEqual(testCase);
    });

    it("test - getCtracingByNric()", async () => {
        const c_tracing = new CtracingServiceMock().getCtracingList();
        const testCase = new ViewCtracingDto(
            c_tracing[0].p_nric,
            c_tracing[0].location_id.toString(),
            c_tracing[0].date.toLocaleString()
        );

        repository.findAndSortByLatestId = jest.fn().mockReturnValue(c_tracing);
        const result = await service.getCtracingByNric(c_tracing[0].p_nric);
        expect(result[0].p_nric).toEqual(testCase.p_nric);
    });

    it("test - getCtracingByDates()", async () => {
        const testCase = new CtracingServiceMock().getCtracingList();

        repository.find = jest.fn().mockReturnValue(testCase);
        const result = await service.getCtracingByDates(new Date(), new Date());
        expect(result).toEqual(testCase);
    });

});