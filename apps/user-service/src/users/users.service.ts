import { Injectable } from '@nestjs/common';
import { NodeID } from '@resideo-nest/core';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'User:1',
      firstName: 'John',
      lastName: 'Rambo',
      rank: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'User:2',
      firstName: 'Richard',
      lastName: 'Hendricks',
      rank: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }
}
