import { Injectable } from "@nestjs/common";
import { c_tracing } from "./schemas/ctracing.schema";
import { CtracingRepository } from "./ctracing.repository";
import {ViewCtracingDto} from "./dto/view-ctracing.dto";
import {DateUtil} from "../commonUtil/DateUtil";

@Injectable()
export class CtracingService {
    constructor(private readonly ctracingRepository: CtracingRepository) {}

    async getCtracingById(ct_id: number): Promise<c_tracing> {
        return this.ctracingRepository.findOne({ ct_id : ct_id });
    }

    async getMaxCtracingId() : Promise<number> {
        return this.ctracingRepository.getMaxCtracingId();
    }

    async getCtracingByNric(nric: string): Promise<ViewCtracingDto[]> {
        const cTracingList : c_tracing[] = await this.ctracingRepository.find({p_nric : nric});
        const result : ViewCtracingDto[] = cTracingList.map((c_tracing : c_tracing) => {
            const date : string = c_tracing.date.toLocaleString();
            return new ViewCtracingDto(c_tracing.p_nric,c_tracing.location_id,date);
        });
        return result;
    }

    async getCtracing(): Promise<c_tracing[]> {
        return this.ctracingRepository.find({});
    }

    async createCtracing(
        p_nric: string,
        location_id:number,
        date : Date): Promise<c_tracing> {
        const highestCtracingId : number = await this.getMaxCtracingId();
        console.log(highestCtracingId);
        const persistence = {
            //increment the id if there is an existing alertId, otherwise initalise at 1
            ct_id: (highestCtracingId > 0) ? highestCtracingId + 1 : 1,
            p_nric : p_nric,
            location_id : location_id,
            date : date,
        };
        return this.ctracingRepository.create(persistence);
    }

}