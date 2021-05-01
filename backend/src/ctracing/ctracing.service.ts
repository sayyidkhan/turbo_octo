import { Injectable } from "@nestjs/common";
import { c_tracing } from "./schemas/ctracing.schema";
import { CtracingRepository } from "./ctracing.repository";

@Injectable()
export class CtracingService {
    constructor(private readonly ctracingRepository: CtracingRepository) {}

    async getCtracingById(ct_id: number): Promise<c_tracing> {
        return this.ctracingRepository.findOne({ ct_id })
    }

    async getCtracing(): Promise<c_tracing[]> {
        return this.ctracingRepository.find({});
    }

    async createCtracing(ct_id: number, p_nric: string, location_id:number , date : number): Promise<c_tracing> {
        return this.ctracingRepository.create({
            ct_id,
            p_nric,
            location_id,
            date
        })
    }

 
}