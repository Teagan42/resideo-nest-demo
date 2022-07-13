import { createUnionType } from '@nestjs/graphql';
import { LoggerService } from '@resideo-nest/core';
import { getTypenameFromId } from '@resideo-nest/core/helpers';
import { Device } from './device.model';
import { User } from './user.model';

export const SubjectUnion = createUnionType(
  {
    name: 'Subject',
    types: () => [
      User,
      Device,
    ],
    resolveType: (value) => {
      const logger = new LoggerService('SUBJECT UNION');
      logger.log(getTypenameFromId(value.id));
      switch (getTypenameFromId(value.id)) {
        case 'User':
          return User;
        case 'Device':
          return Device;
        default:
          return null;
      }
    },
  },
);
