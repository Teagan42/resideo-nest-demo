import { CoreConfig } from '@resideo-nest/core/config';
import { ConstrainedString } from '@resideo-nest/core/types/scalars/ConstrainedString';

export const Password = ConstrainedString(
  'Password',
  'Account password scalar',
  CoreConfig.password,
);
