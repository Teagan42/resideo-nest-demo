import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Credentials } from '../credentials/credentials';

@Injectable()
export class LocalStrategy<CredentialsType extends Credentials> extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(credentials: CredentialsType): Promise<any> {
    return true;
  }
}
