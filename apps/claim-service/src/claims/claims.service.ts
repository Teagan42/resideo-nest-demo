import { Injectable } from '@nestjs/common';
import {
  LoggerService,
  toId,
} from '@resideo-nest/core';
import { randomInt } from 'crypto';
import { Claim } from './models/claim.model';
import { ClaimState } from './models/ClaimState';
import { CreateClaimDto } from './models/dto/create.claim.dto';

@Injectable()
export class ClaimsService {
  private claims: Claim[] = [];

  constructor(
    private readonly logger: LoggerService
  ) {
  }

  all(): Claim[] {
    this.logger.log("all claims", this.claims);
    return this.claims;
  }

  findById(id: string): Claim {
    return this.claims.find(
      (claim) => claim.id === id
    );
  }

  setState(id: string, state: ClaimState): Claim {
    const claim = this.findById(id);
    claim.state = state;
    return claim;
  }

  findByGrantor(grantorId: string): Claim[] {
    return this.claims
      .filter(
        (claim) => claim.grantorId === grantorId
      );
  }

  findByGrantee(granteeId: string): Claim[] {
    return this.claims
               .filter(
                 (claim) => claim.granteeId === granteeId
               );
  }

  create(
    input: CreateClaimDto,
  ): Claim {
    const claim = Object.assign(
      new Claim(),
      input
    );
    claim.id = toId("Claim", randomInt(1000).toString());
    claim.createdAt = new Date();
    claim.updatedAt = new Date();
    claim.grantorId = input.grantorId
    claim.granteeId = input.granteeId
    this.claims.push(claim);
    return claim;
  }
}
