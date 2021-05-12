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

    async find(vaccinesFilterQuery: FilterQuery<v_cert>): Promise<v_cert[]> {
        return this.vaccineModel.find(vaccinesFilterQuery)
    }


    async getMaxVaccineListId(): Promise<number> {
        //Assume vaccine ID is assigned by system all the time,max ID will always be number of object in the table 
        const vaccineList = await this.vaccineModel.find({}).sort({ v_cert : -1 });
        if(vaccineList.length > 0) {
            return vaccineList.length ;
        }
        return 0;
    }

    async create(vaccine: v_cert): Promise<v_cert> {
        const newVaccine = new this.vaccineModel(vaccine);
        return newVaccine.save()
    }

    async findOneAndUpdate(vaccineFilterQuery: FilterQuery<v_cert>, vaccine: Partial<v_cert>): Promise<v_cert> {
        return this.vaccineModel.findOneAndUpdate(vaccineFilterQuery, vaccine, { new: true });
    }

}