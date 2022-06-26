import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountsModule } from '../accounts/accounts.module';
import { jwtConstants } from '../constants';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/JWT';
import { LocalStrategy } from './strategies/Local';

@Module(
  {
    imports: [
      AccountsModule,
      PassportModule,
      JwtModule.register(
        {
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60d' },
        }),
    ],
    providers: [
      AuthService,
      LocalStrategy,
      JWTStrategy,
    ],
  },
)
export class AuthModule {

}
