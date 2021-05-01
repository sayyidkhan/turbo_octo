import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Location, LocationDocument} from "./schemas/location.schema";

@Injectable()
export class LocationRepository {
    constructor(@InjectModel(Location.name) private locationModel: Model<LocationDocument>) {}

    async findOne(query: FilterQuery<Location>): Promise<Location> {
        return this.locationModel.findOne(query);
    }

    async find(query: FilterQuery<Location>): Promise<Location[]> {
        return this.locationModel.find(query)
    }

    async create(myObj: Location): Promise<Location> {
        const newObj = new this.locationModel(myObj);
        return newObj.save()
    }

    async findOneAndUpdate(query: FilterQuery<Location>, user: Partial<Location>): Promise<Location> {
        return this.locationModel.findOneAndUpdate(query, user, { new: true });
    }

}