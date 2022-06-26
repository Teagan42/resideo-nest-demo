import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  Address,
  EmailAddress,
  Password,
  PhoneNumber,
  Username,
} from '@resideo-nest/core';
import { Node } from '@resideo-nest/core/types/interfaces/Node';

@ObjectType(
  {
    implements: [
      Node,
    ],
  },
)
@Directive('@key(fields: "id")')
export class User
  extends Node {
  @Field(
    () => Username,
    {
      name: 'username',
      description: 'The username to authenticate with',
    },
  )
  username: string;

  @Field(
    () => Password,
    {
      name: 'password',
      description: 'The password to authenticate with',
    },
  )
  password: string;

  @Field(
    {
      name: 'firstName',
      description: 'First name of the user',
    },
  )
  firstName: string;

  @Field(
    {
      name: 'lastName',
      description: 'Last name of the user',
    },
  )
  lastName: string;

  @Field(
    () => EmailAddress,
    {
      description: 'Email address of the user',
      nullable: true,
    },
  )
  email?: string;

  @Field(
    () => PhoneNumber,
    {
      description: 'Phone number for the user.',
      nullable: true,
    },
  )
  phoneNumber?: string;

  @Field(
    () => Address,
    {
      description: 'Address of the user.',
      nullable: true,
    },
  )
  address?: Address;
}
