import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import { Claim } from './claim.model';
import {
  NodeId,
  Node,
  DateTime,
} from '@resideo-nest/core';

@ObjectType(
  {
    implements: Node
  }
)
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User extends Node {
  @Field(
    () => NodeId,
  )
  @Directive('@external')
  id: string;

  @Field(
    () => DateTime,
  )
  @Directive('@external')
  createdAt: Date;

  @Field(
    () => DateTime,
  )
  @Directive('@external')
  updatedAt: Date;

  @Field(
    () => [Claim],
    {
      description: 'Claims issued by this user',
      nullable: true,
    },
  )
  issuedClaims?: Claim[];

  @Field(
    () => [Claim],
    {
      description: 'Claims issued to this user',
      nullable: true,
    },
  )
  claims?: Claim[];
}
