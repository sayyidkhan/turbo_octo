import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type HealthcareAlertDocument = HealthcareAlert & Document;

@Schema()
export class HealthcareAlert {
    @Prop()
    healthcareAlertId: number;

    @Prop()
    date: Date;

    @Prop()
    location_id: number;

    @Prop()
    description: string;

    @Prop()
    e_nric : string;

}

export const HealthcareAlertSchema = SchemaFactory.createForClass(HealthcareAlert);