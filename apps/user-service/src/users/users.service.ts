import { Injectable } from '@nestjs/common';
import { toId } from '@resideo-nest/core';
import { randomInt } from 'crypto';
import { CreateUserDto } from './models/dto/create.user.dto';
import { UpdateUserDto } from './models/dto/update.user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
  ) {
  }
  private users: User[] = [
    {
      id: toId('User', '1'),
      firstName: 'John',
      lastName: 'Rambo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: toId('User', '2'),
      firstName: 'Richard',
      lastName: 'Hendricks',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

  all(): User[] {
    return this.users;
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  create(input: CreateUserDto): User {
    const result = Object.assign(new User(), input);
    result.createdAt = new Date();
    result.updatedAt = new Date();
    result.id = toId("User", randomInt(1000).toString());
    this.users.push(result);
    return result;
  }

  update(input: UpdateUserDto): User {
    const user = this.users.find(
      (user) => user.id === input.id
    );
    return Object.assign(
      user,
      input
    );
  }
}
