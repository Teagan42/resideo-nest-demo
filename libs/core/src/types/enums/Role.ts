import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER,
  PRO_USER,
  PRO_ACCOUNT,
  ADMIN,
  SUPER_USER
}

registerEnumType(
  Role,
  {
    name: 'Role',
    description: 'Assigned role',
  },
);
