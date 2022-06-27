import {
  InputType,
  IntersectionType,
} from '@nestjs/graphql';
import { Claim } from '@resideo-nest/auth-plugin/types/objects/claim';
import { NodeDto } from '@resideo-nest/core';

@InputType(
  {
    description: 'Base claim DTO',
    isAbstract: true,
  },
)
export class BaseClaimDto
  extends IntersectionType(
    Claim,
    NodeDto,
  ) {
}
