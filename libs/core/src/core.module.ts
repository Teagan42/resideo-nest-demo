import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { UserModule } from './user/user.module';

@Module({
  providers: [CoreService],
  exports: [CoreService],
  imports: [UserModule],
})
export class CoreModule {}
