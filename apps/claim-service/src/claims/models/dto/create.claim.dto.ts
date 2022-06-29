import {
  InputType,
  PickType,
} from '@nestjs/graphql';
import { Claim } from '../claim.model';
import { BaseClaimDto } from './base.claim.dto';

@InputType(
  'CreateClaimDto',
  {
    description: 'Shape required to create a new claim',
  },
)
export class CreateClaimDto
  extends PickType(
    BaseClaimDto,
    [
      'action',
      'subject',
      'subjectId',
      'expiresAt',
      'grantorId',
      'granteeId',
      'field',
      'state',
    ],
  ) {

}
