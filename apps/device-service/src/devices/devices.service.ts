import { Injectable } from '@nestjs/common';
import { toId } from '@resideo-nest/core';
import { randomInt } from 'crypto';
import { Device } from './models/device.model';
import { CreateDeviceDto } from './models/dto/create.device.dto';

@Injectable()
export class DevicesService {
  private devices: Device[] = [];

  constructor() {
  }

  all(): Device[] {
    return this.devices;
  }

  findById(id: string): Device {
    return this.devices.find((device) => device.id === id);
  }

  findByUserId(userId: string): Device[] {
    return this.devices.filter(
      (device) => device.user.id === userId,
    );
  }

  create(input: CreateDeviceDto): Device {
    const result = Object.assign(
      new Device(),
      input,
    );
    result.createdAt = new Date();
    result.updatedAt = new Date();
    result.id = toId('Device',
                     randomInt(1000)
                       .toString(),
    );
    this.devices.push(result);
    return result;
  }
}
