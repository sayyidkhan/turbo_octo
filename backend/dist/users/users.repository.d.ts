import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
export declare class UsersRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(userFilterQuery: FilterQuery<User>): Promise<User>;
    find(usersFilterQuery: FilterQuery<User>): Promise<User[]>;
    create(user: User): Promise<User>;
    findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User>;
}
