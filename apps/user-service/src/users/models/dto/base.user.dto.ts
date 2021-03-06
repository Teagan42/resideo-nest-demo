import {
  InputType,
  IntersectionType,
} from '@nestjs/graphql';
import { NodeDto } from '@resideo-nest/core';
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
