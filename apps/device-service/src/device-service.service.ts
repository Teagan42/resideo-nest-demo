import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
