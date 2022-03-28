import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SiteDocument = Site & Document;

@Schema()
export class Site {
    @Prop({ required: true })
    name: string;

    @Prop()
    address: string;

    @Prop()
    description: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
