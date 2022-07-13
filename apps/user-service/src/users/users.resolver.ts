import { UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {
  AuthenticationInterceptor,
  NodeId,
  toId,
} from '@resideo-nest/core';
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
    let input = new CreateUserDto();
    input.email = 'test@123.com';
    input.phoneNumber = '+17201234567';
    input.lastName = 'Glenn';
    input.firstName = 'Teagan';
    input.password = 'P@55Word1';
    input.username = 'tglenn';
    // @ts-ignore
    input.id = toId(
      'User',
      '42',
    );
    this.usersService.create(input);
    input.email = 'test@example.com';
    input.phoneNumber = '+17201234567';
    input.lastName = 'Bob';
    input.firstName = 'Saget';
    input.password = 'P@55Word1';
    input.username = 'bword';
    // @ts-ignore
    input.id = toId(
      'User',
      '101',
    );
    this.usersService.create(input);
  }

  @Query(
    () => [User],
    {
      name: 'allUsers',
      description: 'Returns all users in the store',
    },
  )
  @UseInterceptors(AuthenticationInterceptor)
  getAllUsers(): User[] {
    return this.usersService.all();
  }

  @Query(
    () => User,
    {
      name: 'getUserById',
      description: 'Returns the user with te given id',
    },
  )
  getUser(@Args({
                  name: 'id',
                  description: 'Identifier of the user to retrieve',
                  type: () => NodeId,
                }) id: string): User {
    return this.usersService.findById(id);
  }

  @Query(
    () => [User],
    {
      name: 'filterUsers',
      description: 'Returns users matching the filter criteria',
    },
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
