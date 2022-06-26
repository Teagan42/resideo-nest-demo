import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Credentials } from '../credentials/credentials';

class NoStrategy {}

@Injectable()
export class NeverAuthenticatedStrategy<CredentialsType extends Credentials>
  extends PassportStrategy(NoStrategy) {
  constructor() {
    super();
  }

  async validate(credentials: CredentialsType): Promise<any> {
    return false;
  }
}
