import { UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AuthenticationInterceptor,
  NodeId,
  toId,
} from '@resideo-nest/core';
import { DevicesService } from './devices.service';
import { Device } from './models/device.model';
import { CreateDeviceDto } from './models/dto/create.device.dto';
import { User } from './models/user.model';

@Resolver((of) => Device)
export class DevicesResolver {
  constructor(
    private devicesService: DevicesService,
  ) {
    const input = new CreateDeviceDto();
    input.name = 'Teagan\'s Thermostat';
    input.userId = toId(
      'User',
      '42',
    );
    input.deviceId = '00:11:22:33:44:55';
    input.id = toId(
      'Device',
      '1',
    );
    this.devicesService.create(input);
  }

  @Query(
    () => [Device],
    {
      name: 'allDevices',
      description: 'Retrieves all devices in store',
    },
  )
  getAllDevices(): Device[] {
    return this.devicesService.all();
  }

  @Query(
    (returns) => Device,
    {
      name: 'getDeviceById',
      description: 'Returns the device with the specified id',
    },
  )
  @UseInterceptors(AuthenticationInterceptor)
  getDevice(@Args({
                    name: 'id',
                    description: 'The identifier of the device to retrieve',
                    type: () => NodeId,
                  }) id: string): Device {
    return this.devicesService.findById(id);
  }

  @ResolveField(() => User)
  user(@Parent() device: Device): any {
    return {
      __typename: 'User',
      id: device.userId,
    };
  }

  @Mutation(
    returns => Device,
    {
      name: 'createDevice',
      description: 'Create a new Device',
    },
  )
  @UseInterceptors(AuthenticationInterceptor)
  async createDevice(@Args(
    'input',
    { type: () => CreateDeviceDto },
  ) input: CreateDeviceDto): Promise<Device> {
    const device = this.devicesService.create(input);
    device.user = this.user(device);
    return device;
  }

}
