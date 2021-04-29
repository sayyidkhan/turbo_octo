import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type VaccineDocument = v_cert & Document;

@Schema()
export class v_cert {
    @Prop()
    v_cert_id: number;

    @Prop()
    p_nric: string;

    @Prop()
    v_date: number;

    @Prop()
    e_nric: string;
}

export const VaccineSchema = SchemaFactory.createForClass(v_cert);