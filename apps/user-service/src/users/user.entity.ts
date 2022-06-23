import {
  Directive,
  Field,
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
@Directive('@key(fields: "id")')
export class User {
  @Field(
    () => NodeID,
    {
      description: 'Identifier for User object',
    },
  )
  id: string;

  @Field(
    {
      name: 'firstName',
      description: 'First name of the user',
    },
  )
  firstName: string;

  @Field(
    () => EmailAddress,
    {
      nullable: true
    }
  )
  email?: string;

  @Field(
    () => PhoneNumber,
    {
      nullable: true
    }
  )
  phoneNumber?: string;

  @Minimum(5)
  @Field()
  rank: number;
}
