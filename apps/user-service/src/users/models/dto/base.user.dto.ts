import {
  InputType,
  IntersectionType,
} from '@nestjs/graphql';
import { NodeDto } from '@resideo-nest/core/types/inputObjects/NodeDto';
import { User } from '../user.model';

@InputType(
  'BaseUserDto',
  {
    isAbstract: true,
  },
)
export class BaseUserDto
  extends IntersectionType(
    User,
    NodeDto,
  ) {
}
