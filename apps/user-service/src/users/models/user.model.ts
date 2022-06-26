import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  Address,
  EmailAddress,
  PhoneNumber,
} from '@resideo-nest/core';
import { Node } from '@resideo-nest/core/types/interfaces/Node';

@ObjectType(
  {
    description: "Represents a user in the system",
    implements: [
      Node,
    ],
  },
)
@Directive('@key(fields: "id")')
export class User
  extends Node {
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
      description: "Email address of the user",
      nullable: true,
    },
  )
  email?: string;

  @Field(
    () => PhoneNumber,
    {
      description: "Phone number for the user.",
      nullable: true,
    },
  )
  phoneNumber?: string;

  @Field(
    () => Address,
    {
      description: "Address of the user.",
      nullable: true,
    }
  )
  address?: Address
}
