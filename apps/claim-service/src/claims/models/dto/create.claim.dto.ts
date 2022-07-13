import {
  InputType,
  IntersectionType,
  PartialType,
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
  extends IntersectionType(
    PickType(
      BaseClaimDto,
      [
        'action',
        'grantorId',
        'granteeId',
        'state',
      ],
    ),
    PartialType(
      PickType(
        BaseClaimDto,
        [
          'subject',
          'subjectId',
          'field',
          'expiresAt'
          ]
      )
    )
  ) {
}
