import { IDField } from '@nestjs-query/query-graphql';
import {
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { Node } from '@resideo-nest/core/types/interfaces/Node';

@ObjectType(
  "User",
  {
    description: "",
    implements: () => [Node]
  }
)
export class UserDto {
  id: string;
}
