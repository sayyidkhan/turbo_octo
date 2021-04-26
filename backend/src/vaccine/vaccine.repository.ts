import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { v_cert, VaccineDocument } from "./schemas/vaccine.schema";

@Injectable()
export class VaccineRepository {
    constructor(@InjectModel(v_cert.name) private userModel: Model<VaccineDocument>) {}

    async findOne(userFilterQuery: FilterQuery<v_cert>): Promise<v_cert> {
        return this.userModel.findOne(userFilterQuery);
    }

    async find(usersFilterQuery: FilterQuery<v_cert>): Promise<v_cert[]> {
        return this.userModel.find(usersFilterQuery)
    }

    async create(user: v_cert): Promise<v_cert> {
        const newUser = new this.userModel(user);
        return newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<v_cert>, user: Partial<v_cert>): Promise<v_cert> {
        return this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }
}