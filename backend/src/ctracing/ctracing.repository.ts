import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { c_tracing, CtracingDocument } from "./schemas/ctracing.schema";

@Injectable()
export class CtracingRepository {
    constructor(@InjectModel(c_tracing.name) private ctracingModel: Model<CtracingDocument>) {}

    async findOne(ctracingFilterQuery: FilterQuery<c_tracing>): Promise<c_tracing> {
        return this.ctracingModel.findOne(ctracingFilterQuery);
    }

    async find(ctracingsFilterQuery: FilterQuery<c_tracing>): Promise<c_tracing[]> {
        return this.ctracingModel.find(ctracingsFilterQuery)
    }

    async create(ctracing: c_tracing): Promise<c_tracing> {
        const newCtracing = new this.ctracingModel(ctracing);
        return newCtracing.save()
    }

    async findOneAndUpdate(ctracingFilterQuery: FilterQuery<c_tracing>, ctracing: Partial<c_tracing>): Promise<c_tracing> {
        return this.ctracingModel.findOneAndUpdate(ctracingFilterQuery, ctracing, { new: true });
    }
}