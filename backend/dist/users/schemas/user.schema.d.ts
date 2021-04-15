import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    userId: string;
    email: string;
    age: number;
    favoriteFoods: string[];
}
export declare const UserSchema: import("mongoose").Schema<Document<User, {}>, import("mongoose").Model<any, any>, undefined>;
