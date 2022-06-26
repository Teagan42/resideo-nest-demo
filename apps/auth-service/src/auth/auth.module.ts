import {
  DynamicModule,
  Module,
} from '@nestjs/common';
import { AuthConfig } from '@reside-nest/auth/auth.config';
import { AuthService } from './auth.service';

@Module({})
export class AuthModule {
  static register(
    config: AuthConfig
  ): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        AuthService
      ]
    }
  }
}
