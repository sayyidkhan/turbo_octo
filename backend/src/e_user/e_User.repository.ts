import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { E_User , E_UserDocument } from "./schemas/e_user.schema";

@Injectable()
export class E_UserRepository {
    constructor(@InjectModel(E_User.name) private eUserModel: Model<E_UserDocument>) {}

    async findOne(query: FilterQuery<E_User>): Promise<E_User> {
        return this.eUserModel.findOne(query);
    }

    async find(query: FilterQuery<E_User>): Promise<E_User[]> {
        return this.eUserModel.find(query);
    }

    async create(myObj: E_User): Promise<E_User> {
        const newUser = new this.eUserModel(myObj);
        return newUser.save();
    }

    async findOneAndUpdate(query: FilterQuery<E_User>, user: Partial<E_User>): Promise<E_User> {
        return this.eUserModel.findOneAndUpdate(query, user, { new: true });
    }

    async deleteEnterpriseUserById(query: FilterQuery<E_User>): Promise<E_User> {
        return this.eUserModel.findByIdAndRemove(query);
    }

}