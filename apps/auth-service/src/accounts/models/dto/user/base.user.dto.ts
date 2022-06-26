import {
  InputType,
  IntersectionType,
  PickType,
} from '@nestjs/graphql';
import { NodeDto } from '@resideo-nest/core';
import { Claim } from '../../claim.model';
import { User } from '../../user.model';

@InputType(
  'BaseUserDto',
  {
    isAbstract: true,
  },
)
export class BaseUserDto
  extends PickType(
    User,
    [
      'accountId'
    ]
  ) {
}
