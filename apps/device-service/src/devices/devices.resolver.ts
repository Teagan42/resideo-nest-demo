import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { NodeId } from '@resideo-nest/core';
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
      description: 'Retrieves all devices in store'
    },
  )
  getAllDevices(): Device[] {
    return this.devicesService.all();
  }

  @Query(
    (returns) => Device,
    {
      name: "getDeviceById",
      description: 'Returns the device with the specified id'
    }
  )
  getDevice(@Args({
                    name: 'id',
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
  async createDevice(@Args(
    'input',
    { type: () => CreateDeviceDto },
  ) input: CreateDeviceDto): Promise<Device> {
    const device = this.devicesService.create(input);
    device.user = this.user(device);
    return device;
  }

}
