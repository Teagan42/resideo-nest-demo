import {
  Field,
  InputType,
  IntersectionType,
  OmitType,
} from '@nestjs/graphql';
import { EmailAddress } from '@resideo-nest/core';
import { NodeDto } from '@resideo-nest/core/types/objects/NodeDto';
import { User } from '../user.model';

@InputType(
  'BaseUserDto',
  {
    isAbstract: true,
  },
)
export class BaseUserDto extends IntersectionType(
  User,
  NodeDto
) {}
