import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnerAccountModule } from './partner-account/partner-account.module';
import { PartnerUserModule } from './partner-user/partner-user.module';

@Module({
  imports: [PartnerAccountModule, PartnerUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
