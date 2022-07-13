import {
  Parent,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { ClaimsService } from './claims.service';
import { Claim } from './models/claim.model';
import { User } from './models/user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly claimsService: ClaimsService,
  ) {
  }

  @ResolveReference()

  @ResolveField(() => [Claim])
  public issuedClaims(@Parent() user: User): Claim[] {
    return this.claimsService.findByGrantor(user.id);
  }

  @ResolveField(() => [Claim])
  public claims(@Parent() user: User): Claim[] {
    return this.claimsService.findByGrantee(user.id);
  }
}
