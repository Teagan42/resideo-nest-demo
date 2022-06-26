import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  NodeId,
} from '@resideo-nest/core';
import { Device } from './device.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(
    () => NodeId,
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
