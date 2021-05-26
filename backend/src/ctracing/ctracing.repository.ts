import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";

import {c_tracing, CtracingDocument} from "./schemas/ctracing.schema";

@Injectable()
export class CtracingRepository {
    constructor(@InjectModel(c_tracing.name) private ctracingModel: Model<CtracingDocument>) {}

    async findOne(ctracingFilterQuery: FilterQuery<c_tracing>): Promise<c_tracing> {
        return this.ctracingModel.findOne(ctracingFilterQuery);
    }

    async find(ctracingsFilterQuery: FilterQuery<c_tracing>): Promise<c_tracing[]> {
        return this.ctracingModel.find(ctracingsFilterQuery);
    }

    async findAndSortByLatestId(ctracingsFilterQuery: FilterQuery<c_tracing>): Promise<c_tracing[]> {
        return this.ctracingModel.find(ctracingsFilterQuery).sort({ ct_id : -1 });
    }

    checkEmptyArray: (alertList: c_tracing[]) => (number | number) = (alertList : c_tracing[]) => {
        if(alertList.length > 0) {
        const cTracing :c_tracing = alertList[0];
        return cTracing.ct_id;
        }
        return 0;
    }

    async getMaxCtracingId(): Promise<number> {
        const alertList = await this.ctracingModel.find({}).sort({ ct_id : -1 }).limit(1);
        const result = this.checkEmptyArray(alertList);
        return result;
    }

    async create(ctracing: c_tracing): Promise<c_tracing> {
        const newCtracing = new this.ctracingModel(ctracing);
        return newCtracing.save();
    }

}