import { CrudRepository } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends CrudRepository<UserEntity> {
  constructor(@InjectModel(UserEntity.name) userModel: Model<UserEntity>) {
    super(userModel);
  }
}
