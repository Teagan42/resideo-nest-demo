import { registerEnumType } from '@nestjs/graphql';

export enum Action {
  READ,
  WRITE,
  MANAGE,
  CREATE,
  UPDATE,
  DELETE
}

registerEnumType(
  Action,
  {
    name: 'Action',
    description: 'Action to perform'
  }
)
