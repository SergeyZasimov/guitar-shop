import { User, UserField, UserRole } from '@guitar-shop/core';
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
  [UserField.UserName]: string;

  @Prop({
    required: true,
    unique: true,
    immutable: true,
  })
  [UserField.Email]: string;

  @Prop({
    required: true,
  })
  [UserField.PasswordHash]: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    immutable: true,
  })
  [UserField.Role]: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
