import { forwardRef, Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';

// import { UserModule } from '../../feature/user/user.module';
import { AuthenticationService } from './authentication.service';
// import { AuthStrategy } from './authentication.strategy';

@Module({
  // imports: [
  //   JwtModule.register({
  //     secretOrPrivateKey: 'secretKey',
  //     signOptions: {
  //       expiresIn: 3600
  //     }
  //   }),
  //   // forwardRef(() => UserModule)    // 处理模块间的循环依赖
  // ],
  providers: [
    AuthenticationService,
    // AuthStrategy
  ],
  exports: [AuthenticationService]
})
export class AuthenticationModule { }