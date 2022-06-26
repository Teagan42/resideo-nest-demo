import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Credentials } from '@reside-nest/auth/../credentials/credentials';

class NoStrategy {}

@Injectable()
export class AlwaysAuthenticatedStrategy<CredentialsType extends Credentials>
  extends PassportStrategy(NoStrategy) {
  constructor() {
    super();
  }

  async validate(credentials: CredentialsType): Promise<any> {
    return true;
  }
}
