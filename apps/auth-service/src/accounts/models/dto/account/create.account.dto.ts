import {
  Field,
  InputType,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Claim } from '../../claim.model';
import {
  CreateAccountClaimDto,
  CreateClaimDto,
} from '../claim/create.claim.dto';
import { CreateAccountUserDto } from '../user/create.user.dto';
import { BaseAccountDto } from './base.account.dto';

@InputType(
  'CreateAccountDto',
  {
    description: 'Required shape to create an account',
  },
)
export class CreateAccountDto
  extends PickType(
      BaseAccountDto,
      [
        'username',
        'password',
        'role',
        'userId'
      ],
    ) {
  @Field(
    () => [CreateAccountClaimDto],
    {
      name: 'claims',
      description: 'Claims to add to this account',
      defaultValue: [] as CreateAccountClaimDto[]
    }
  )
  claims: CreateAccountClaimDto[];
  //
  // @Field(
  //   () => CreateAccountUserDto,
  //   {
  //     name: "user",
  //     description: 'User to add to this account',
  //   }
  // )
  // user: CreateAccountUserDto;
}
