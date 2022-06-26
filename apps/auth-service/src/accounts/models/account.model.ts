import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  Node,
  NodeID,
  Password,
  Role,
  Username,
} from '@resideo-nest/core';
import { Claim } from './claim.model';
import { User } from './user.model';

@ObjectType(
  {
    description: 'Account entity',
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
      name: 'username',
      description: 'Account username associated with this user',
    },
  )
  username: string;

  @Field(
    () => Password,
    {
      name: 'password',
      description: 'Account username associated with this user',
    },
  )
  password: string;

  @Field(
    () => NodeID,
    {
      name: 'userId',
      description: 'Identifier of the user associated with this account',
    },
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

  @Field(
    () => Role,
    {
      name: 'role',
      description: 'The role assigned to this account',
    },
  )
  role: Role;

  @Field(
    () => [Claim],
    {
      name: "claims",
      description: 'The claims associated with this role'
    }
  )
  claims: Claim[];
}
