import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type p_UserDocument = p_user & Document;

@Schema()
export class p_user {
     
    @Prop()
    p_nric: string;

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    covid_status: boolean;
}

export const P_UserSchema = SchemaFactory.createForClass(p_user);