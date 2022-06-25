import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { DevicesService } from './devices.service';
import { Device } from './models/device.model';
import { CreateDeviceDto } from './models/dto/create.device.dto';
import { User } from './models/user.model';

@Resolver((of) => Device)
export class DevicesResolver {
  constructor(
    private devicesService: DevicesService,
  ) {
  }

  @Query(
    () => [Device],
    {
      name: 'allDevices',
    },
  )
  getAllDevices(): Device[] {
    return this.devicesService.all();
  }

  @Query((returns) => Device)
  getDevice(@Args({
                  name: 'id',
                  type: () => NodeID,
                }) id: string): Device {
    return this.devicesService.findById(id);
  }

  @ResolveField(() => User)
  user(@Parent() device: Device): any {
    return { __typename: 'User', id: device.userId };
  }

  @Mutation(
    returns => Device,
    {
      name: 'createDevice',
      description: 'Create a new Device',
    },
  )
  async createDevice(@Args(
    'input',
    { type: () => CreateDeviceDto },
  ) input: CreateDeviceDto): Promise<Device> {
    const device = this.devicesService.create(input);
    device.user = this.user(device);
    return device;
  }

}
