import {Repository} from "../repository";
import {Injectable} from "@nestjs/common";
import {HasID} from "@resideo-nest/core/helpers";

@Injectable()
export class MemoryRepository<TEntity extends HasID<string>> extends Repository<TEntity, string> {
  private readonly records: Map<string, TEntity> = new Map<string, TEntity>();

  constructor() {
    super();
  }

  private async upsert(...entities: TEntity[]): Promise<TEntity[]> {
    return entities
      .map(
        (entity) => this.records.set(entity.id, entity).get(entity.id)
      );
  }


  async insert(...entities: TEntity[]): Promise<TEntity[]> {
    return this.upsert(...entities);
  }

  async update(...entities: TEntity[]): Promise<TEntity[]> {
    return this.upsert(...entities);
  }

  async delete(...entityIds: string[]): Promise<boolean> {
    return entityIds
      .filter(
        this.records.has
      )
      .every(
        (id: string) => {
          try {
            this.records.delete(id);
            return true
          } catch (e) {
            return false
          }
        }
      )
  }

  async retrieve(predicate: (entity: TEntity) => boolean | null): Promise<TEntity[]> {
    return Promise.resolve(
      Array.from(this.records.values())
        .filter(
          (record: TEntity) =>
            predicate
              ? predicate(record)
              : false
        ));
  };
}