import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  AuthZ,
  MAC,
  Node,
  NodeId,
} from '@resideo-nest/core';
import { User } from './user.model';

@ObjectType(
  {
    description: 'Represents a smart device',
    implements: [
      Node,
    ],
  },
)
@Directive('@key(fields: "id")')
@AuthZ(
  {
    rules: [
      // 'CanReadType',
      'CanReadDevice'
    ]
  }
)
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
    {
      name: 'temperature',
      description: 'Temperature reading',
      nullable: true,
    },
  )
  temperature: number;

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
