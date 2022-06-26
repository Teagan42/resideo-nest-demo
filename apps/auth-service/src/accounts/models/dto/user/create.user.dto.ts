import {
  Field,
  InputType,
} from '@nestjs/graphql';
import {
  Address,
  EmailAddress,
  PhoneNumber,
} from '@resideo-nest/core';

@InputType(
  "CreateAccountUserDto",
  {
    description: "Required shape to create a user inline with account creation"
  }
)
export class CreateAccountUserDto {
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
