import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { AccountsService } from './accounts.service';
import { Account } from './models/account.model';
import { CreateAccountDto } from './models/dto/create.account.dto';
import { User } from './models/user.model';

@Resolver((of) => Account)
export class AccountsResolver {
  constructor(
    private accountsService: AccountsService,
  ) {
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
    return account;
  }

}
