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
    @Inject(CONTEXT_DATA) public userId: string,
  ) {
    this.logger.setContext("ContextData");
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
    const claim = ContextData.buildClaimString(
      action,
      subject,
      subjectId,
      field,
    );
    const claimSet = new Set(this._claims);
    if (!active) {
      claimSet.delete(claim);
    } else {
      claimSet.add(claim);
    }
    this._claims = Array.from(claimSet);
    return this;
  }

  public static buildClaimString(
    action: string,
    subject: string | null = null,
    subjectId: string | null = null,
    field: string | null = null,
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
