import {Injectable} from "@nestjs/common";
import {v_cert} from "./schemas/vaccine.schema";
import {VaccineRepository} from "./vaccine.repository";
import {c_tracing} from "../ctracing/schemas/ctracing.schema";

@Injectable()
export class VaccineService {
    constructor(private readonly vaccineRepository: VaccineRepository) {}

    async getVaccineById(v_cert_id: number): Promise<v_cert> {
        return this.vaccineRepository.findOne({ v_cert_id : v_cert_id })
    }

    async getLatestVaccinationRecordOnly(p_nric: string): Promise<v_cert> {
        const vCert : v_cert = await this.vaccineRepository.getLatestVaccinationRecordOnly({ p_nric : p_nric });
        return vCert;
    }
  
    async getVaccineByp_nric(p_nric: string): Promise<v_cert[]> {
        return this.vaccineRepository.find({ p_nric : p_nric });
    }

    async getVaccineBye_nric(e_nric: string): Promise<v_cert[]> {
        return this.vaccineRepository.find({ e_nric : e_nric });
    }

    async getAllVaccinationList(): Promise<v_cert[]> {
        return this.vaccineRepository.find({});
    }

    async getMaxAlertListId() : Promise<number> {
        return this.vaccineRepository.getMaxVaccineListId();
    }

    async getVaccineByDates(date_from : Date, date_to : Date) : Promise<v_cert[]> {
        return this.vaccineRepository.find({ v_date : {
                $gte : date_from,
                $lte : date_to,
            }
        });
    }

    async getVaccineByMonthOnly(month : number, year : number) : Promise<v_cert[]> {
        return this.vaccineRepository.find({ $expr: {
                $and: [
                    {$eq: [{ $year: "$v_date" }, year]},
                    {$eq: [{ $month: "$v_date" }, month]},
                ]
            }});
    }

    async createVaccine(p_nric: string, v_date :Date , e_nric : string): Promise<v_cert> {
        const highestAlertListId : number = await this.getMaxAlertListId();
        const persistence = {
            //increment the id if there is an existing alertId, otherwise initalise at 1
            v_cert_id: (highestAlertListId > 0) ? highestAlertListId + 1 : 1,
            p_nric: p_nric,
            v_date: v_date,
            e_nric: e_nric,
        };
        return this.vaccineRepository.create(persistence);
    }
 
}