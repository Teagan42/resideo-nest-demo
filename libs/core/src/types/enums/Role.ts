import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER,
  PRO,
  ADMIN,
  SUPER
}

registerEnumType(
  Role,
  {
    name: "Role",
    description: "The account's role."
  }
)
