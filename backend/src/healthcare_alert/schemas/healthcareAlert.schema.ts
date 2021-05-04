import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type HealthcareAlertDocument = HealthcareAlertList & Document;

@Schema()
export class HealthcareAlertList {
    @Prop()
    healthcareAlertId: number;

    @Prop()
    date: number;

    @Prop()
    location_id: number;

    @Prop()
    description: string;

}

export const HealthcareAlertListSchema = SchemaFactory.createForClass(HealthcareAlertList);