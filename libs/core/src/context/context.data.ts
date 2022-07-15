import {
  Inject,
  Injectable
} from '@nestjs/common';
import {LoggerService} from "@resideo-nest/core";

export const CONTEXT_DATA = Symbol('Container for user context');

@Injectable()
export class ContextData {
  private _claims: string[] = [];

  constructor(
    private readonly logger: LoggerService,
    @Inject(CONTEXT_DATA) private readonly _userId: string,
  ) {
    this.logger.setContext("ContextData");
  }

  get userId(): string {
    return this._userId;
  }

  get claims(): string[] {
    return this._claims;
  }

  public assignClaim(
    active: boolean,
    action: string,
    subject: string | null,
    subjectId: string | null,
    field: string | null,
  ): this {
    this.logger.log("Assigning Claim");
    const claim = ContextData.buildClaimString(
      action,
      subject,
      subjectId,
      field,
    );
    this.logger.log(`Claim ${claim}`);
    const claimSet = new Set(this._claims);
    if (!active) {
      this.logger.log("Deleting")
      claimSet.delete(claim);
    } else {
      this.logger.log("Adding");
      claimSet.add(claim);
    }
    this._claims = Array.from(claimSet);
    this.logger.log(`Claims ${Array.from(this._claims)}`);
    return this;
  }

  private static buildClaimString(
    action: string,
    subject: string | null,
    subjectId: string | null,
    field: string | null,
  ): string {
    let claim = action;
    if (subject) {
      claim += `:${subject}`;
    }
    if (subjectId) {
      claim += `:${subjectId}`;
    }
    if (field) {
      claim += `:${subjectId}`;
    }

    return claim;
  }
}
