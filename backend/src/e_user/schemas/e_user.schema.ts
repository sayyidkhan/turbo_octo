import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type E_UserDocument = E_User & Document;

@Schema()
export class E_User {
    @Prop()
    e_nric: string;

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    password: string;

    @Prop()
    admintype: string;

}

export const E_UserSchema = SchemaFactory.createForClass(E_User);