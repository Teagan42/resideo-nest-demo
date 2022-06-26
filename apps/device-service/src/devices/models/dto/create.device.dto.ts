import {
  Field,
  InputType,
  PickType,
} from '@nestjs/graphql';
import { NodeId } from '@resideo-nest/core';
import { BaseDeviceDto } from './base.device.dto';

@InputType(
  'CreateDeviceDto',
  {
    description: 'Required shape to create a device',
  },
)
export class CreateDeviceDto
  extends PickType(
    BaseDeviceDto,
    [
      'name',
      'deviceId',
    ],
  ) {
  @Field(
    () => NodeId,
    {
      name: 'userId',
      description: 'Node identifier of the user to assign device to',
    },
  )
  userId: string;
}
