import {
  InputType,
  IntersectionType,
} from '@nestjs/graphql';
import { NodeDto } from '@resideo-nest/core/types/inputObjects/NodeDto';
import { Device } from '../device.model';

@InputType(
  'BaseDeviceDto',
  {
    isAbstract: true,
  },
)
export class BaseDeviceDto
  extends IntersectionType(
    Device,
    NodeDto,
  ) {
}
