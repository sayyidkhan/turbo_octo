import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import {AlertList , AlertListDocument } from "./schemas/alertList.schema";


@Injectable()
export class AlertListRepository {
    constructor(@InjectModel(AlertList.name) private alertListModel: Model<AlertListDocument>) {}

    async findOne(query: FilterQuery<AlertList>): Promise<AlertList> {
        return this.alertListModel.findOne(query);
    }

    async find(query: FilterQuery<AlertList>): Promise<AlertList[]> {
        return this.alertListModel.find(query).sort({ alertListId : -1 });
    }

    async getMaxAlertListId(): Promise<number> {
        const alertList = await this.alertListModel.find({}).sort({ alertListId : -1 }).limit(1);
        if(alertList.length > 0) {
            const alert :AlertList = alertList[0];
            return alert.alertListId;
        }
        return 0;
    }

    async create(myObj: AlertList): Promise<AlertList> {
        const newObj = new this.alertListModel(myObj);
        return newObj.save()
    }

    async findOneAndUpdate(query: FilterQuery<AlertList>, user: Partial<AlertList>): Promise<AlertList> {
        return this.alertListModel.findOneAndUpdate(query, user, { new: true });
    }

    async deleteAlertListById(query: FilterQuery<AlertList>): Promise<AlertList> {
        return this.alertListModel.findByIdAndRemove(query);
    }

}