import {
  Field,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import {
  Action,
  DateTime,
  NodeID,
  Node,
} from '@resideo-nest/core';
import { Account } from './account.model';

@ObjectType(
  {
    description: 'Ability to claim an action on a subject',
    implements: [
      Node
    ]
  }
)
export class Claim extends Node {
  @Field(
    () => DateTime,
    {
      name: 'expiresAt',
      description: 'The point in time this claim expires',
      nullable: true
    }
  )
  expiresAt?: Date;

  @Field(
    () => Action,
    {
      name: 'action',
      description: 'The action associated with this claim'
    }
  )
  action: Action;

  @Field(
    () => NodeID,
    {
      name: "nodeId",
      description: 'Identifier of the subject node'
    }
  )
  nodeId: string;

  @Field(
    {
      name: 'field',
      description: "The subject's field name for this claim"
    }
  )
  field?: string;

  @Field(
    () => NodeID,
    {
      name: "accountId",
      description: "The identifier of the account that has this claim",
    }
  )
  accountId: string;

  @Field(
    () => Account,
    {
      name: 'account',
      description: 'The account that has this claim'
    }
  )
  account: Account;
}
