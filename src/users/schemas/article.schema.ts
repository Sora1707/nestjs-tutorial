import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument, Document } from 'mongoose';

@Schema()
export class Article extends Document {
    @Prop({ required: true })
    authorId: mongoose.Types.ObjectId;

    @Prop({ default: false })
    isPublished: boolean;
}

export type UserDocument = HydratedDocument<Article>;

export const UserSchema = SchemaFactory.createForClass(Article);
