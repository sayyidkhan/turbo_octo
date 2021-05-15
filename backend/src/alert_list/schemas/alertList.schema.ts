import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type AlertListDocument = AlertList & Document;

@Schema()
export class AlertList {
    @Prop()
    alertListId: number;

    @Prop()
    alertTitle: string;

    @Prop()
    alertDetail: string;

    @Prop()
    alertDate: Date;

    @Prop()
    active: boolean;

    @Prop()
    location_id: number;
}

export const AlertListSchema = SchemaFactory.createForClass(AlertList);