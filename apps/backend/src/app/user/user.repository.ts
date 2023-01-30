import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.model';
import { CrudRepository } from '../interfaces/repository.abstract';

@Injectable()
export class UserRepository extends CrudRepository<UserModel> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {
    super(userModel);
  }
}
