import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../users/schemas/users.schema';

export type SiteDocument = Site & Document;

@Schema()
export class Site {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop()
    description: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    uId: Types.ObjectId;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
