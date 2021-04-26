import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Location, LocationDocument} from "./schemas/location.schema";

@Injectable()
export class LocationRepository {
    constructor(@InjectModel(Location.name) private locationModel: Model<LocationDocument>) {}

    async findOne(userFilterQuery: FilterQuery<Location>): Promise<Location> {
        return this.locationModel.findOne(userFilterQuery);
    }

    async find(usersFilterQuery: FilterQuery<Location>): Promise<Location[]> {
        return this.locationModel.find(usersFilterQuery)
    }

    async create(user: Location): Promise<Location> {
        const newUser = new this.locationModel(user);
        return newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<Location>, user: Partial<Location>): Promise<Location> {
        return this.locationModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }
}