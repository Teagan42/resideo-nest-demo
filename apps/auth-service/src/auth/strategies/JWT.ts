import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { jwtConstants } from '../../constants';
import { Credentials } from '../credentials/credentials';

@Injectable()
export class JWTStrategy<CredentialsType extends Credentials>
  extends PassportStrategy(Strategy) {
  constructor() {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
      },
    );
  }

  async validate(credentials: CredentialsType): Promise<any> {
    return true;
  }
}
