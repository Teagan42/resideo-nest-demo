import {
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DevicesService } from './devices.service';
import { Device } from './models/device.model';
import { User } from './models/user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly devicesService: DevicesService,
  ) {
  }

  @ResolveField(() => [Device])
  public devices(@Parent() user: User): Device[] {
    return this.devicesService.findByUserId(user.id);
  }
}
