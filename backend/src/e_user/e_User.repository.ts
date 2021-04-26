import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { E_User , E_UserDocument } from "./schemas/e_user.schema";

@Injectable()
export class E_UserRepository {
    constructor(@InjectModel(E_User.name) private eUserModel: Model<E_UserDocument>) {}

    async findOne(eUserFilterQuery: FilterQuery<E_User>): Promise<E_User> {
        return this.eUserModel.findOne(eUserFilterQuery);
    }

    async find(eUserFilterQuery: FilterQuery<E_User>): Promise<E_User[]> {
        return this.eUserModel.find(eUserFilterQuery);
    }

    async create(eUser: E_User): Promise<E_User> {
        const newUser = new this.eUserModel(eUser);
        return newUser.save();
    }

    async findOneAndUpdate(eUserFilterQuery: FilterQuery<E_User>, user: Partial<E_User>): Promise<E_User> {
        return this.eUserModel.findOneAndUpdate(eUserFilterQuery, user, { new: true });
    }

    async deleteUserById(eUserFilterQuery: FilterQuery<E_User>): Promise<E_User> {
        return this.eUserModel.findByIdAndRemove(eUserFilterQuery);
    }

}