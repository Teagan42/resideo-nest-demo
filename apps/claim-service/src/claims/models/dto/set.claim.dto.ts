import {
  InputType,
  PickType,
} from '@nestjs/graphql';
import { BaseClaimDto } from './base.claim.dto';

@InputType(
  'SetClaimDto',
  {
    description: 'Sets a claim state',
  },
)
export class SetClaimDto
  extends PickType(
    BaseClaimDto,
    [
      'id',
      'state',
    ],
  ) {
}
