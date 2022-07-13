import {
  InputType,
  PickType,
} from '@nestjs/graphql';
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
      'id',
      'name',
      'deviceId',
      'userId',
    ],
  ) {
}
