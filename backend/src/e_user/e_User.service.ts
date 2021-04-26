import { Injectable } from "@nestjs/common";
// import { v4 as uuidv4 } from 'uuid';
// import { UpdateUserDto } from "./dto/update-user.dto";

import { E_User } from "./schemas/e_user.schema";
import { E_UserRepository } from "./e_User.repository";
import {UpdateEnterpriseUserDto} from "./dto/update-eUser.dto";
import {Types} from "mongoose";


@Injectable()
export class E_UserService {
    constructor(private readonly e_UserRepository: E_UserRepository) {}

    async getEnterpriseUserById(eNRIC: string): Promise<E_User> {
        return this.e_UserRepository.findOne({ eNRIC : eNRIC })
    }

    async getAllEnterpriseUser(): Promise<E_User[]> {
        return this.e_UserRepository.find({});
    }

    async createNewEnterpriseUser(
        eNric: string,
        firstName: string,
        lastName: string,
        password: string,
        adminType: string,): Promise<E_User> {
        return this.e_UserRepository.create({
            eNRIC : eNric,
            firstName : firstName,
            lastName : lastName,
            password : password,
            adminType: adminType,
        });
    }

    async updateUser(eNRIC: string, euserUpdates: UpdateEnterpriseUserDto): Promise<E_User> {
        return this.e_UserRepository.findOneAndUpdate({ eNRIC : eNRIC }, euserUpdates);
    }

    async deleteUserById(eNRIC: string): Promise<E_User> {
        const findUser = await this.getEnterpriseUserById(eNRIC);
        //check user list in record, if not return null
        // only record exist then perform delete
        console.log(findUser);
        if(findUser != null) {
            return this.e_UserRepository.deleteUserById({ _id : findUser['_id'] });
        }
        return null;
    }

}