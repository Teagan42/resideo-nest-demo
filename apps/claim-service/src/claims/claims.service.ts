import { Injectable } from '@nestjs/common';
import { Claim } from './models/claim.model';

@Injectable()
export class ClaimsService {
  private claims: Claim[] = [];

  constructor() {
  }

  all(): Claim[] {
    return this.claims;
  }

  findById(id: string): Claim {
    return this.claims.find(
      (claim) => claim.id === id
    );
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
}
