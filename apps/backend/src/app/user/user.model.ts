import { User, UserRole } from '@guitar-shop/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
    minlength: 1,
    maxlength: 15,
  })
  public userName: string;

  @Prop({
    required: true,
    unique: true,
    immutable: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    immutable: true,
  })
  public role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
