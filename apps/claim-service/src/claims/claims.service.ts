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

  findByGrantor(): Claim[] {
    return this.claims;
  }

  findByGrant
}
