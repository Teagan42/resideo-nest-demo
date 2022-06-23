import {
  FilterableField,
  IDField,
} from '@nestjs-query/query-graphql';
import {
  Directive,
  Field,
  ID,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import {
  EmailAddress,
  PhoneNumber,
  NodeID,
  Minimum,
} from '@resideo-nest/core';
import { Node } from '@resideo-nest/core/types/interfaces/Node';

@ObjectType(
  'User',
  {
    implements: [
      Node,
    ],
  },
)
export class User
  extends Node {
  @IDField(
    () => NodeID,
    {
      name: 'id',
      description: 'The identifier of the node',
    },
  )
  id: string;

  @FilterableField(
    {
      name: 'firstName',
      description: 'First name of the user',
    },
  )
  firstName: string;

  @FilterableField(
    {
      name: 'lastName',
      description: 'Last name of the user',
    },
  )
  lastName: string;

  @FilterableField(
    () => EmailAddress,
    {
      nullable: true,
    },
  )
  email?: string;

  @Field(
    () => PhoneNumber,
    {
      nullable: true,
    },
  )
  phoneNumber?: string;

  @Minimum(5)
  @Field()
  rank: number;
}
