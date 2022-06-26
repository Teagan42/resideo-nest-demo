import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  Address,
  EmailAddress,
  Node,
  NodeID,
  Password,
  PhoneNumber,
  Username,
} from '@resideo-nest/core';
import { User } from './user.model';


@ObjectType(
  {
    description: "Account entity",
    implements: [
      Node,
    ],
  },
)
@Directive('@key(fields: "id")')
export class Account
  extends Node {
  @Field(
    () => Username,
    {
      name: "userName",
      description: "Account username associated with this user",
    }
  )
  username: string;

  @Field(
    () => Password,
    {
      name: "userName",
      description: "Account username associated with this user",
    }
  )
  password: string;

  @Field(
    () => NodeID,
    {
      name: "userId",
      description: "Identifier of the user associated with this account"
    }
  )
  userId: string;

  @Field(
    () => User,
    {
      name: 'user',
      description: 'User this account is associated with',
    },
  )
  user: User;
}
