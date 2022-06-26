import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { ClaimsService } from './claims.service';
import { Account } from './models/account.model';
import { Claim } from './models/claim.model';
import { CreateClaimDto } from './models/dto/claim/create.claim.dto';
import { User } from './models/user.model';

@Resolver((of) => Claim)
export class ClaimsResolver {
  constructor(
    private claimsService: ClaimsService,
  ) {
  }

  @ResolveField(() => Account)
  account(@Parent() claim: Claim): any {
    return { __typename: 'Account', id: claim.accountId };
  }

  @Query(
    () => [Claim],
    {
      name: 'allClaims',
    },
  )
  getAllClaims(): Claim[] {
    return this.claimsService.all();
  }

  @Mutation(
    returns => Claim,
    {
      name: 'createClaim',
      description: 'Create a new claim',
    },
  )
  async createClaim(@Args(
    'input',
    { type: () => CreateClaimDto},
  ) input: CreateClaimDto): Promise<Claim> {
    const claim = this.claimsService.createClaim(input);
    claim.createdAt = new Date();
    claim.updatedAt = new Date();
    claim.account = this.account(claim);
    return claim;
  }
}
