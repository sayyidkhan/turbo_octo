import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type E_UserDocument = E_User & Document;

@Schema()
export class E_User {
    @Prop()
    e_nric: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    password: string;

    @Prop()
    adminType: string;

}

export const E_UserSchema = SchemaFactory.createForClass(E_User);