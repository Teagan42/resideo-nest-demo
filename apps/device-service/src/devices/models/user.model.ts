import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  EmailAddress,
  Node,
  NodeID,
  PhoneNumber,
} from '@resideo-nest/core';
import { Device } from './device.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(
    () => NodeID,
  )
  @Directive('@external')
  id: string;

  @Field(
    () => [Device],
    {
      description: "Devices associated with this user",
      nullable: true
    }
  )
  devices?: Device[];
}