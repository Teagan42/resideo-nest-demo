import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  MAC,
  Node,
  NodeId,
} from '@resideo-nest/core';
import { User } from './user.model';

@ObjectType(
  {
    implements: [
      Node,
    ],
  },
)
@Directive('@key(fields: "id")')
export class Device
  extends Node {
  @Field(
    () => MAC,
    {
      name: 'deviceId',
      description: 'MAC address of the device',
    },
  )
  deviceId: string;

  @Field(
    {
      name: 'name',
      description: 'Name of the device',
    },
  )
  name: string;

  @Field(
    () => NodeId,
    {
      name: 'userId',
      description: 'The identifier of the user this device is associated with',
    },
  )
  userId: string;

  @Field(
    () => User,
    {
      name: 'user',
      description: 'User this device is associated with',
    },
  )
  user: User;
}
