import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class CrudRepository<TEntity extends Document> {
  constructor(protected readonly entityModel: Model<TEntity>) {}

  public async findOne(
    entityFilterQuery: FilterQuery<TEntity>
  ): Promise<TEntity | null> {
    return this.entityModel.findOne(entityFilterQuery);
  }

  public async find(
    entityFilterQuery: FilterQuery<TEntity>
  ): Promise<TEntity[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  public async create(entityCreateData: Partial<TEntity>): Promise<TEntity> {
    return this.entityModel.create(entityCreateData);
  }

  public async findOneAndUpdate(
    entityFilterQuery: FilterQuery<TEntity>,
    entityUpdateData: UpdateQuery<Partial<TEntity>>
  ): Promise<TEntity | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      entityUpdateData,
      { new: true }
    );
  }

  public async delete(
    entityFilterQuery: FilterQuery<TEntity>
  ): Promise<void | null> {
    this.entityModel.deleteOne(entityFilterQuery);
  }
}
