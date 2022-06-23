import {HasID} from "@resideo-nest/core/helpers";

export abstract class Repository<EntityType extends HasID<IdentifierType>, IdentifierType> {

  protected constructor(
  ) {
  }

  protected abstract retrieve(
    predicate?: (entity: EntityType) => boolean
  ): Promise<EntityType[]>;

  protected abstract update(
    ...entities: EntityType[]
  ): Promise<EntityType[]>;

  protected abstract delete(
    ...entityIds: IdentifierType[]
  ): Promise<boolean>;

  protected abstract insert(
    ...entities: EntityType[]
  ): Promise<EntityType[]>;

}