import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";

import {v_cert, VaccineDocument} from "./schemas/vaccine.schema";

@Injectable()
export class VaccineRepository {
    constructor(@InjectModel(v_cert.name) private vaccineModel: Model<VaccineDocument>) {}

    async findOne(vaccineFilterQuery: FilterQuery<v_cert>): Promise<v_cert> {
        return this.vaccineModel.findOne(vaccineFilterQuery);
    }

    verifyList(vaccines : v_cert[]) {
        if(vaccines.length !== 0) {
            const records: v_cert[] = vaccines.filter((record : v_cert) => {
                return record.v_cert_id !== undefined;
            });
            return records;
        }
        else {
            return [];
        }
    }

    async find(vaccinesFilterQuery: FilterQuery<v_cert>): Promise<v_cert[]> {
        const vaccines : v_cert[] = await this.vaccineModel.find(vaccinesFilterQuery).sort({v_cert_id : -1});
        const result = this.verifyList(vaccines);
        return result;
    }

    verifyList_LatestRecord(vaccines : v_cert[]) {
        if (vaccines.length !== 0) {
            return vaccines[0];
        }
        else {
            return null;
        }
    }

    async getLatestVaccinationRecordOnly(vaccinesFilterQuery): Promise<v_cert> {
        const vaccines : v_cert[] = await this.vaccineModel.find(vaccinesFilterQuery).sort({v_cert_id : -1}).limit(1);
        const result = this.verifyList_LatestRecord(vaccines);
        return result;
    }


    async getMaxVaccineListId(): Promise<number> {
        //Assume vaccine ID is assigned by system all the time,max ID will always be number of object in the table 
        const vaccineList = await this.vaccineModel.find({}).sort({v_cert_id : -1});
        return (vaccineList.length > 0) ? vaccineList.length : 0;
    }

    async create(vaccine: v_cert): Promise<v_cert> {
        const newVaccine = new this.vaccineModel(vaccine);
        return newVaccine.save()
    }

}