import {Injectable} from "@nestjs/common";
import {HasID} from "@resideo-nest/core/helpers";

@Injectable()
export class MemoryRepositoryFactory<TIdentifierType, TEntity extends HasID<TIdentifierType>> {
  private readonly entityRepos: Map<
    TEntity,
    Repository<
      TIdentifierType,
      TEntityType extends HasID<TIdentifierType>
        >
    > = new Map<TEntity, Repository<TIdentifierType, any>>(;)


  constructor() {
  }

  getFor(
    entity: TEntity,
  ): Repository<EntityType extends HasID<IdentifierType>, IdentifierType> {
    if (this.entityRepos.has(entity.))
      }
}