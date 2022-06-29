import { Module } from '@nestjs/common';
import { TestLibService } from './test-lib.service';

@Module({
  providers: [TestLibService],
  exports: [TestLibService],
})
export class TestLibModule {}
