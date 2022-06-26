import { CoreConfig } from '@resideo-nest/core/config';
import { constrainedString } from '@resideo-nest/core/types';

export const Username = constrainedString(
  'Username',
  'Account username scalar',
  CoreConfig.username,
);
