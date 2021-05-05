import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {HealthcareAlert, HealthcareAlertDocument} from "./schemas/healthcareAlert.schema";


@Injectable()
export class HealthCareAlertRepository {
    constructor(@InjectModel(HealthcareAlert.name) private healthcareAlert: Model<HealthcareAlertDocument>) {}

    async findOne(query: FilterQuery<HealthcareAlert>): Promise<HealthcareAlert> {
        return this.healthcareAlert.findOne(query);
    }

    async find(vaccinesFilterQuery: FilterQuery<HealthcareAlert>): Promise<HealthcareAlert[]> {
        return this.healthcareAlert.find(vaccinesFilterQuery)
    }

    async getMaxAlertListId(): Promise<number> {
        const alertList = await this.healthcareAlert.find({}).sort({ healthcareAlertId : -1 }).limit(1);
        if(alertList.length > 0) {
            const alert :HealthcareAlert = alertList[0];
            return alert.healthcareAlertId;
        }
        return 0;
    }

    async create(vaccine: HealthcareAlert): Promise<HealthcareAlert> {
        const newVaccine = new this.healthcareAlert(vaccine);
        return newVaccine.save()
    }

    async findOneAndUpdate(query: FilterQuery<HealthcareAlert>, vaccine: Partial<HealthcareAlert>): Promise<HealthcareAlert> {
        return this.healthcareAlert.findOneAndUpdate(query, vaccine, { new: true });
    }

}