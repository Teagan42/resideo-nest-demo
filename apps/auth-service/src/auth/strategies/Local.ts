import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Credentials } from '@reside-nest/auth/../credentials/credentials';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy<CredentialsType extends Credentials> extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(credentials: CredentialsType): Promise<any> {
    return true;
  }
}
