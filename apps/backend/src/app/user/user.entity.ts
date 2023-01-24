import { User, UserRole } from '@guitar-shop/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Document } from 'mongoose';
import { DEFAULT_PASSWORD_HASH, SALT_ROUNDS } from './user.constant';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserEntity extends Document implements User {
  constructor(data: User) {
    super();
    this.userName = data.userName;
    this.email = data.email;
    this.role = data.role;
    this.passwordHash = data.passwordHash
      ? data.passwordHash
      : DEFAULT_PASSWORD_HASH;
  }

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

  public async setPassword(password: string): Promise<UserEntity> {
    this.passwordHash = await hash(password, SALT_ROUNDS);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
