// /*
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
//
// import { AuthenticationService } from './authentication.service';
//
// @Injectable()
// export class AuthStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthenticationService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'secretKey',
//     });
//   }
//
//   async validate(payload: { account: string }) {
//     const user = await this.authService.validateUser(payload);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }*/
