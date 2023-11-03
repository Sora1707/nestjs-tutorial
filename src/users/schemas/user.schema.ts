import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, default: 'Bot' })
    firstName: string;

    @Prop({ required: true, default: 'Tester' })
    lastName: string;

    @Prop()
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
