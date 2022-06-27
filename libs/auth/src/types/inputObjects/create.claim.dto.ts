import {
  InputType,
  PickType,
} from '@nestjs/graphql';
import { Claim } from '@resideo-nest/auth-plugin/types/objects/claim';

@InputType(
  "CreateClaimDto",
  {
    description: 'Shape required to create a new claim',
  }
)
export class CreateClaimDto extends
  PickType(
    Claim,
    [

    ]
  ) {

}
