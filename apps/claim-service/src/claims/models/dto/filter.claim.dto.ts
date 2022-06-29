import {
  InputType,
  PartialType,
} from '@nestjs/graphql';
import { CreateClaimDto } from './create.claim.dto';

@InputType(
  'FilterClaimsDto',
  {
    description: 'Required shape to filter for claims',
  },
)
export class FilterClaimDto
  extends PartialType(
    CreateClaimDto,
  ) {
}
