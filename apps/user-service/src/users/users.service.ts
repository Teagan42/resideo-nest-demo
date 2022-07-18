import { Injectable } from '@nestjs/common';
import {
  LoggerService,
  toId,
} from '@resideo-nest/core';
import { randomInt } from 'crypto';
import { CreateUserDto } from './models/dto/create.user.dto';
import { UpdateUserDto } from './models/dto/update.user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext("UserService");
  }

  all(): User[] {
    return this.users;
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  create(input: CreateUserDto): User {
    const result = Object.assign(
      new User(),
      input,
    );
    result.createdAt = new Date();
    result.updatedAt = new Date();
    if (!result.id) {
      result.id = toId(
        'User',
        randomInt(1000)
          .toString(),
      );
    }
    this.users.push(result);
    return result;
  }

  update(input: UpdateUserDto): User {
    const user = this.users.find(
      (user) => user.id === input.id,
    );
    return Object.assign(
      user,
      input,
    );
  }
}
