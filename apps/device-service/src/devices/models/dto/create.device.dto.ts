import {
  Field,
  InputType,
  PickType,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { BaseDeviceDto } from './base.device.dto';

@InputType(
  'CreateDeviceDto',
  {
    description: 'Required shape to create a device'
  }
)
export class CreateDeviceDto extends PickType(
  BaseDeviceDto,
  [
    'name',
    'deviceId',
    'userId'
  ]
) {

}
