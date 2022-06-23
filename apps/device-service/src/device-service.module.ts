import { Module } from '@nestjs/common';
import { DeviceServiceController } from './device-service.controller';
import { DeviceServiceService } from './device-service.service';

@Module({
  imports: [],
  controllers: [DeviceServiceController],
  providers: [DeviceServiceService],
})
export class DeviceServiceModule {}
