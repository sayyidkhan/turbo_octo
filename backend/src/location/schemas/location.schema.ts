import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
    @Prop()
    location_id: number;

    @Prop()
    location_name: string;

}

export const LocationSchema = SchemaFactory.createForClass(Location);