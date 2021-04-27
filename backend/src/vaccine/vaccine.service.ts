import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { v_cert } from "./schemas/vaccine.schema";
import { VaccineRepository } from "./vaccine.repository";

@Injectable()
export class VaccineService {
    constructor(private readonly vaccineRepository: VaccineRepository) {}

    async getVaccineById(v_cert_id: string): Promise<v_cert> {
        return this.vaccineRepository.findOne({ v_cert_id })
    }

    async getVaccine(): Promise<v_cert[]> {
        return this.vaccineRepository.find({});
    }

    async createVaccine(v_cert_id: string, p_nric: string, v_date:number , e_nric : string): Promise<v_cert> {
        return this.vaccineRepository.create({
            v_cert_id: uuidv4(),
            p_nric,
            v_date,
            e_nric
        })
    }

 
}