import { CoreConfig } from '@resideo-nest/core/config';
import { constrainedString } from '@resideo-nest/core/types';

export const Password = constrainedString(
  'Password',
  'Account password scalar',
  CoreConfig.password,
);
