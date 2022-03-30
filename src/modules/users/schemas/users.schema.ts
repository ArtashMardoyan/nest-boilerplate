import { Document } from 'mongoose';
import { compareSync, genSalt, hash } from 'bcryptjs';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    _id: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    comparePassword(password: string): boolean {
        return compareSync(password, this.password);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
    const salt: string = await genSalt(10);

    this.password = await hash(this.password, salt);

    await next();
});

UserSchema.loadClass(User);
