import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Claim } from '../claim.model';
import { BaseClaimDto } from './base.claim.dto';

@InputType(
  'SetClaimDto',
  {
    description: 'Sets a claim state',
  },
)
export class SetClaimDto
  extends
    PickType(
      BaseClaimDto,
      [
        'id',
        'state',
      ],
  ) {
}
