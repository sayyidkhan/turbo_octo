import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { c_tracing, CtracingDocument } from "./schemas/ctracing.schema";
import {AlertList} from "../alert_list/schemas/alertList.schema";

@Injectable()
export class CtracingRepository {
    constructor(@InjectModel(c_tracing.name) private ctracingModel: Model<CtracingDocument>) {}

    async findOne(ctracingFilterQuery: FilterQuery<c_tracing>): Promise<c_tracing> {
        return this.ctracingModel.findOne(ctracingFilterQuery);
    }

    async find(ctracingsFilterQuery: FilterQuery<c_tracing>): Promise<c_tracing[]> {
        return this.ctracingModel.find(ctracingsFilterQuery).sort({ ct_id : -1 });
    }

    async getMaxCtracingId(): Promise<number> {
        const alertList = await this.ctracingModel.find({}).sort({ ct_id : -1 }).limit(1);
        console.log(alertList);
        if(alertList.length > 0) {
            const cTracing :c_tracing = alertList[0];
            return cTracing.ct_id;
        }
        return 0;
    }

    async create(ctracing: c_tracing): Promise<c_tracing> {
        const newCtracing = new this.ctracingModel(ctracing);
        return newCtracing.save()
    }

    async findOneAndUpdate(ctracingFilterQuery: FilterQuery<c_tracing>, ctracing: Partial<c_tracing>): Promise<c_tracing> {
        return this.ctracingModel.findOneAndUpdate(ctracingFilterQuery, ctracing, { new: true });
    }

}