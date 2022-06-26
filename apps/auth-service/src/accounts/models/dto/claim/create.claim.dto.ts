import {
  InputType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { BaseClaimDto } from './base.claim.dto';

@InputType(
  'CreateClaimDto',
  {
    description: 'Required shape to create a claim',
  },
)
export class CreateClaimDto
  extends PickType(
    BaseClaimDto,
    [
      'action',
      'nodeId',
      'field',
      'expiresAt',
      'accountId',
    ],
  ) {
}

@InputType(
  'CreateAccountClaimDto',
  {
    description: 'Required shape to create a claim in line with account creation',
  },
)
export class CreateAccountClaimDto
  extends OmitType(
    CreateClaimDto,
    [
      'accountId',
    ],
  ) {

}
