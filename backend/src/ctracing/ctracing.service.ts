import {Injectable} from "@nestjs/common";
import {c_tracing} from "./schemas/ctracing.schema";
import {CtracingRepository} from "./ctracing.repository";

@Injectable()
export class CtracingService {
    constructor(private readonly ctracingRepository: CtracingRepository) {}

    async getCtracingById(ct_id: number): Promise<c_tracing> {
        return this.ctracingRepository.findOne({ ct_id : ct_id });
    }

    async getMaxCtracingId() : Promise<number> {
        return this.ctracingRepository.getMaxCtracingId();
    }

    async getCtracingByNric(p_nric: string): Promise<c_tracing[]> {
        return this.ctracingRepository.findAndSortByLatestId({p_nric : p_nric});
    }

    async getCtracingByLocationID(location_id: number): Promise<c_tracing[]> {
        return this.ctracingRepository.findAndSortByLatestId({location_id : location_id});
    }

    async getCtracingByLatestId(): Promise<c_tracing[]> {
        return this.ctracingRepository.findAndSortByLatestId({});
    }

    async getCtracingByDates(date_from : Date, date_to : Date) : Promise<c_tracing[]> {
        return this.ctracingRepository.find({ date : {
                $gte : date_from,
                $lte : date_to,
            }
        });
    }

    async getCtracingByMonthOnly(date : Date) : Promise<c_tracing[]> {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return this.ctracingRepository.find({ date : {
                $expr : {
                    $and: [
                        {$eq: [{ $year: "$timestamp" }, year]},
                        {$eq: [{ $month: "$timestamp" }, month]}
                    ]
                }
            }
        });
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