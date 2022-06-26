import { Injectable } from '@nestjs/common';
import { toId } from '@resideo-nest/core';
import { randomInt } from 'crypto';
import { Account } from './models/account.model';
import { CreateAccountDto } from './models/dto/account/create.account.dto';

@Injectable()
export class AccountsService {
  constructor() {
  }

  private accounts: Account[] = [];

  all(): Account[] {
    return this.accounts;
  }

  findById(id: string): Account {
    return this.accounts.find((account) => account.id === id);
  }

  findByUserId(userId: string): Account {
    return this.accounts.find(
      (account) => account.user.id === userId,
    );
  }

  create(input: CreateAccountDto): Account {
    const result = Object.assign(
      new Account(),
      input,
    );
    result.createdAt = new Date();
    result.updatedAt = new Date();
    result.id = toId("Account", randomInt(1000).toString());
    this.accounts.push(result);
    return result;
  }
}
