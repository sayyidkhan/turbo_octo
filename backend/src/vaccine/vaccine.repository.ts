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

    async getMaxAlertListId(): Promise<number> {
        const alertList = await this.vaccineModel.find({}).sort({ alertListId : -1 }).limit(1);
        if(alertList.length > 0) {
            const vaccination :v_cert = alertList[0];
            return vaccination.v_cert_id;
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