import {Injectable, Scope} from "@nestjs/common";
import {Repository} from "./repository";
import {HasID} from "@resideo-nest/core/helpers";

;

@Injectable({
  scope: Scope.TRANSIENT,
})
export class RepositoryService<EntityType extends HasID<IdentifierType>, IdentifierType> {
  constructor(
    private readonly repository: Repository<EntityType, IdentifierType>,
  ) {
  }
}
