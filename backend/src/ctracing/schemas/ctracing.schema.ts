import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CtracingDocument = c_tracing & Document;

@Schema()
export class c_tracing {
    @Prop()
    ct_id: number;
    @Prop()
    p_nric: string;
    @Prop()
    location_id: number;
    @Prop()
    date: Date;
}

export const CtracingSchema = SchemaFactory.createForClass(c_tracing);