import { Injectable } from '@nestjs/common';
import { NodeID } from '@resideo-nest/core';
import { User } from './models/user.model';
import {Repository} from "../data/repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly entityRepository: Repository<undefined, undefined>
  ) {
  }
  private users: User[] = [
    {
      id: 'User:1',
      firstName: 'John',
      lastName: 'Rambo',
      semver: '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'User:2',
      firstName: 'Richard',
      lastName: 'Hendricks',
      semver: 'abc',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }
}
