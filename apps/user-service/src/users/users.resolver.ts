import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { NodeId } from '@resideo-nest/core';
import { CreateUserDto } from './models/dto/create.user.dto';
import { FilterUserDto } from './models/dto/filter.user.dto';
import { UpdateUserDto } from './models/dto/update.user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

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
      description: 'Returns all users in the store'
    },
  )
  getAllUsers(): User[] {
    return this.usersService.all();
  }

  @Query(
    () => User,
    {
      name: 'getUserById',
      description: 'Returns the user with te given id'
    }
  )
  getUser(@Args({
                  name: 'id',
                  type: () => NodeId,
                }) id: string): User {
    return this.usersService.findById(id);
  }

  @Query(
    () => [User],
    {
      name: 'filterUsers',
      description: 'Returns users matching the filter criteria'
    }
  )
  filterUsers(@Args({
                      name: 'criteria',
                      type: () => FilterUserDto,
                    }) criteria: FilterUserDto): User[] {
    return this.usersService.all()
               .filter(
                 (user) =>
                   criteria.email
                   ? user.email === criteria.email
                   : true,
               )
               .filter(
                 (user) =>
                   criteria.firstName
                   ? user.firstName === criteria.firstName
                   : true,
               )
               .filter(
                 (user) =>
                   criteria.lastName
                   ? user.lastName === criteria.lastName
                   : true,
               )
               .filter(
                 (user) =>
                   criteria.phoneNumber
                   ? user.phoneNumber === criteria.phoneNumber
                   : true,
               );
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

  @Mutation(
    () => User,
    {
      name: 'updateUser',
      description: 'Updates a user entity',
    },
  )
  async updateUser(@Args(
    'input',
    { type: () => UpdateUserDto },
  ) input: UpdateUserDto): Promise<User> {
    return this.usersService.update(input);
  }
}
