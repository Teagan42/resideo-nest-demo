import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { Account } from './account.model';

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
    () => NodeID,
    {
      name: "accountId",
      description: 'Identifier for the account associated with this user',
    }
  )
  accountId: string;


  @Field(
    () => Account,
    {
      description: 'Account associated with this user',
    },
  )
  account: Account;
}
