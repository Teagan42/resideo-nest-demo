import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  NodeID,
} from '@resideo-nest/core';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(
    () => NodeID,
  )
  @Directive('@external')
  id: string;

  @Field(
    () => Pass
    {
      name: "userName",
      description: "Account username associated with this user"
    }
  )
}
