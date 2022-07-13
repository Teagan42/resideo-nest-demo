import { Module } from '@nestjs/common';
import {
  LoggerModule,
  LoggerProvider,
} from '@resideo-nest/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [
    LoggerModule.build("Claim Service"),
    ClaimsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
