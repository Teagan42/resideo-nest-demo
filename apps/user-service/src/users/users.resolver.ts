import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { RankUpDto } from './models/dto/rankup.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {
  }

  @Query((returns) => User)
  getUser(@Args({
                  name: 'id',
                  type: () => NodeID,
                }) id: string): User {
    return this.usersService.findById(id);
  }

  @Query((returns) => User)
  filterUser(@Args({
                     name: 'id',
                     type: () => NodeID,
                   }) id: string): User {
    return this.usersService.findById(id);
  }

  @Mutation(
    () => User,
    {
      name: 'rankUp',
      description: 'Increase user rank',
    },
  )
  rankUp(@Args({
                 name: 'input',
                 type: () => RankUpDto,
               }) input: RankUpDto): User {
    const user = this.getUser(input.id);
    user.rank += input.rankDelta;
    return user;
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): User {
    return this.usersService.findById(reference.id);
  }
}
