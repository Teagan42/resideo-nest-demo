import { Injectable } from '@nestjs/common';
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

  createClaim(
    input: CreateClaimDto,
  ): Claim {
    const claim = Object.assign(new Claim(), input);
    const account = this.accountService.findById(input.accountId);
    if (account) {
      account.claims.push();
    }
    return claim;
  }

  getClaims(
    account: Account
  ): Claim[] {
    return [];
  }
}
