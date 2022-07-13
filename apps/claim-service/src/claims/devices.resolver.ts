import {
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClaimsService } from './claims.service';
import { Claim } from './models/claim.model';
import { Device } from './models/device.model';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(
    private readonly claimsService: ClaimsService,
  ) {
  }

  @ResolveField(() => [Claim])
  public claims(@Parent() device: Device): Claim[] {
    return this.claimsService.all()
               .filter(
                 (claim) => claim.subjectId === device.id,
               );
  }
}
