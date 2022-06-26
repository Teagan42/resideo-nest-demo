import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { AccountsService } from './accounts.service';
import { ClaimsService } from './claims.service';
import { Account } from './models/account.model';
import { Claim } from './models/claim.model';
import { CreateAccountDto } from './models/dto/account/create.account.dto';
import {
  CreateAccountClaimDto,
  CreateClaimDto,
} from './models/dto/claim/create.claim.dto';
import { User } from './models/user.model';

@Resolver((of) => Account)
export class AccountsResolver {
  constructor(
    private accountsService: AccountsService,
    private claimsService: ClaimsService,
    // private userService: UsersService,
  ) {
  }

  private mapAccountClaimDto(accountId: string, claim: CreateAccountClaimDto): CreateClaimDto {
    return Object.assign(
      new CreateClaimDto(),
                 claim,
      {
        accountId
      }
    );
  }

  @Query(
    () => [Account],
    {
      name: 'allAccounts',
    },
  )
  getAllAccounts(): Account[] {
    return this.accountsService.all();
  }

  @Query((returns) => Account)
  getAccount(@Args({
                  name: 'id',
                  type: () => NodeID,
                }) id: string): Account {
    return this.accountsService.findById(id);
  }

  @ResolveField(() => User)
  user(@Parent() account: Account): any {
    return { __typename: 'User', id: account.userId };
  }

  @ResolveField(() => [Claim])
  claims(@Parent() account: Account): any {
    return this.claimsService.getClaims(account.id);
  }

  @Mutation(
    returns => Account,
    {
      name: 'createAccount',
      description: 'Create a new account',
    },
  )
  async createAccount(@Args(
    'input',
    { type: () => CreateAccountDto },
  ) input: CreateAccountDto): Promise<Account> {
    const account = this.accountsService.create(input);
    account.user = this.user(account);
    input.claims.forEach(
      (claim) => {
        this.claimsService.createClaim(
          this.mapAccountClaimDto(
            account.id,
            claim
          )
        )
      }
    )
    return account;
  }
}
