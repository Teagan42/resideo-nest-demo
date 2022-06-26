import { Injectable } from '@nestjs/common';
import { toId } from '@resideo-nest/core';
import { randomInt } from 'crypto';
import { AccountsService } from './accounts.service';
import { Account } from './models/account.model';
import { Claim } from './models/claim.model';
import { CreateClaimDto } from './models/dto/claim/create.claim.dto';

@Injectable()
export class ClaimsService {
  constructor(
    private readonly accountService: AccountsService,
  ) {
  }

  private claims: Claim[] = [];

  all(): Claim[] {
    return this.claims;
  }

  createClaim(
    input: CreateClaimDto,
  ): Claim {
    const claim = Object.assign(
      new Claim(),
      input,
    );
    claim.createdAt = new Date();
    claim.updatedAt = new Date();
    claim.id = toId(
      'Account',
      randomInt(1000)
        .toString(),
    );
    this.claims.push(claim);
    return claim;
  }

  getClaims(
    accountId: string,
  ): Claim[] {
    return this.claims.filter(
      (claim) => claim.accountId === accountId,
    );
  }
}
