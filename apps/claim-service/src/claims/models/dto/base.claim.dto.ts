import {
  InputType,
  IntersectionType,
} from '@nestjs/graphql';
import {
  NodeDto,
} from '@resideo-nest/core';
import { Claim } from '../claim.model';

@InputType(
  'BaseClaimDto',
  {
    isAbstract: true,
  },
)
export class BaseClaimDto
  extends IntersectionType(
    Claim,
    NodeDto,
  ) {
}
