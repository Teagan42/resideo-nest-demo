import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Credentials } from '@reside-nest/auth/../credentials/credentials';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

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
