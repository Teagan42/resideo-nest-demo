import {
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from './models/account.model';
import { User } from './models/user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly accountsService: AccountsService
  ) {
  }

  @ResolveField(() => Account)
  public account(@Parent() user: User): Account {
    return this.accountsService.findByUserId(user.id);
  }
}
