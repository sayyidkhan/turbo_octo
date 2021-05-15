import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { p_user, p_UserDocument } from "./schemas/p_user.schema";

@Injectable()
export class P_UserRepository {
    constructor(@InjectModel(p_user.name) private p_userModel: Model<p_UserDocument>) {}

    async findOne(p_userFilterQuery: FilterQuery<p_user>): Promise<p_user> {
        return this.p_userModel.findOne(p_userFilterQuery);
    }

    async find(p_usersFilterQuery: FilterQuery<p_user>): Promise<p_user[]> {
        return this.p_userModel.find(p_usersFilterQuery)
    }

    async create(p_user: p_user): Promise<p_user> {
        const newP_User = new this.p_userModel(p_user);
        return newP_User.save()
    }

    async findOneAndUpdate(p_userFilterQuery: FilterQuery<p_user>, p_user: Partial<p_user>): Promise<p_user> {
        return this.p_userModel.findOneAndUpdate(p_userFilterQuery, p_user, { new: true });
    }

}