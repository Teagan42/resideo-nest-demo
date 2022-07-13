export const CONTEXT_DATA = Symbol('Container for user context');

export interface UserContextData {
  userId: string;
  claims: string;
}

export class ContextData {
  private readonly _claims: Set<string> = new Set<string>();

  constructor(
    private readonly _userId: string,
  ) {
  }

  get userId(): string {
    return this._userId;
  }

  get claims(): string[] {
    return Array.from(this._claims.values());
  }

  userContext(): UserContextData {
    return {
      userId: this.userId,
      claims: this.claims.join(' ') || '',
    };
  }

  public assignClaim(
    active: boolean,
    action: string,
    subject: string | null,
    subjectId: string | null,
    field: string | null,
  ): this {
    const claim = this.buildClaimString(
      action,
      subject,
      subjectId,
      field,
    );
    if (!active && this._claims.has(claim)) {
      this._claims.delete(claim);
    } else {
      this._claims.add(claim);
    }

    return this;
  }

  private buildClaimString(
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
