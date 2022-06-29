import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [ClaimsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
