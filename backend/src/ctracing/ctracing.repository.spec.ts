import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import {MongooseModule} from "@nestjs/mongoose";
import {c_tracing, CtracingSchema} from "./schemas/ctracing.schema";
import {CtracingRepository} from "./ctracing.repository";
import {CtracingService} from "./ctracing.service";
import {CtracingModule} from "./ctracing.module";

describe("c_tracing Repository", () => {
    let repository : CtracingRepository;
    let service : CtracingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports : [
                CtracingModule,
                AppModule,
                MongooseModule.forFeature([ { name: c_tracing.name, schema: CtracingSchema }]),
            ],
            providers : [
                {
                    provide : CtracingRepository,
                    useValue : {
                        find : jest.fn(),
                        findOne : jest.fn(),
                    }
                },
                CtracingService,
            ]
        }).compile();

        service = module.get<CtracingService>(CtracingService);
        repository = module.get<CtracingRepository>(CtracingRepository);
    });

    afterEach(async () => {
        service = null;
        repository = null;
    });

    it('test - find()', async () => {
        await service.getCtracingByLatestId();
        expect(repository.find({})).toBeDefined();
    });

    it('test - findOne()', async () => {
        await service.getCtracingById(123456);
        expect(repository.findOne({})).toBeDefined();
    });

    it('test - getMaxCtracingId()', async () => {
        await service.getMaxCtracingId();
        expect(repository.findOne({})).toBeDefined();
    });

    it('test - create()', async () => {
        const testObj = new c_tracing();
        await service.createCtracing("p_nric",123456,new Date());
        expect(repository.create(testObj)).toBeDefined();
    });

    it('test - checkEmptyArray()',async () => {
        const cTracing = new c_tracing();
        cTracing.ct_id = 123456;
        //check empty array
        repository.checkEmptyArray([]);
        expect(repository.checkEmptyArray([])).toEqual(0);
        //check array with value
        const result = repository.checkEmptyArray([cTracing]);
        expect(result).toEqual(cTracing.ct_id);
    });

});