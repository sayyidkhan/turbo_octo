import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { p_user } from "./schemas/p_user.schema";
import { P_UserRepository } from "./p_user.repository";

@Injectable()
export class P_UserService {
    constructor(private readonly p_userRepository: P_UserRepository) {}

    async getP_UserById(p_nric: string): Promise<p_user> {
        return this.p_userRepository.findOne({ p_nric : p_nric })
    }

    async getP_User(): Promise<p_user[]> {
        return this.p_userRepository.find({});
    }

    async createP_User(p_nric: string, firstname:string,lastname:string,covid_status:boolean): Promise<p_user> {
        return this.p_userRepository.create({
            p_nric,
            firstname,
            lastname,
            covid_status,
        })
    }

}