import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './models/dto/create.user.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
  ) {
  }

  @Query(
    () => [User],
    {
      name: 'allUsers',
    },
  )
  getAllUsers(): User[] {
    return this.usersService.all();
  }

  @Query((returns) => User)
  getUser(@Args({
                  name: 'id',
                  type: () => NodeID,
                }) id: string): User {
    return this.usersService.findById(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): User {
    return this.usersService.findById(reference.id);
  }

  @Mutation(
    returns => User,
    {
      name: 'createUser',
      description: 'Create a new User',
    },
  )
  async createUser(@Args(
    'input',
    { type: () => CreateUserDto },
  ) input: CreateUserDto): Promise<User> {
    return this.usersService.create(input);
  }

}
