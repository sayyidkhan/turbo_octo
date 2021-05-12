import {Injectable} from "@nestjs/common";
import {v_cert} from "./schemas/vaccine.schema";
import {VaccineRepository} from "./vaccine.repository";

@Injectable()
export class VaccineService {
    constructor(private readonly vaccineRepository: VaccineRepository) {}

    async getVaccineById(v_cert_id: number): Promise<v_cert> {
        return this.vaccineRepository.findOne({ v_cert_id : v_cert_id })
    }

    //get by date 

    async getVaccineByDate(v_date : Date): Promise<v_cert> {
        return this.vaccineRepository.findOne({ v_date : new Date })
    }

    async getAllVaccinationList(): Promise<v_cert[]> {
        return this.vaccineRepository.find({});
    }

    async getMaxAlertListId() : Promise<number> {
        return this.vaccineRepository.getMaxVaccineListId();
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