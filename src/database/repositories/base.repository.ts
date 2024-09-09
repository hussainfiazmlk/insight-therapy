import { DeepPartial, FindOneOptions, RemoveOptions, Repository, SaveOptions } from "typeorm";

export abstract class BaseRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const response = this.repository.create(entity);
    return await this.repository.save(response);
  }

  async save(entity: T, options?: SaveOptions): Promise<T> {
    return this.repository.save(entity, options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async deleteOne(entity: T, options?: RemoveOptions): Promise<T> {
    return this.repository.remove(entity, options);
  }
}
