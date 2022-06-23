import { Controller, Get } from '@nestjs/common';
import { DeviceServiceService } from './device-service.service';

@Controller()
export class DeviceServiceController {
  constructor(private readonly deviceServiceService: DeviceServiceService) {}

  @Get()
  getHello(): string {
    return this.deviceServiceService.getHello();
  }
}
