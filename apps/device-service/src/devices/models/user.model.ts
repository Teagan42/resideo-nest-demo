import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  DateTime,
  Node,
  NodeId,
} from '@resideo-nest/core';
import { Device } from './device.model';

@ObjectType(
  {
    implements: Node,
  },
)
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User
  extends Node {
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
    () => [Device],
    {
      description: 'Devices associated with this user',
      nullable: true,
    },
  )
  devices?: Device[];
}
