import { CoreConfig } from '@resideo-nest/core/config';
import { ConstrainedString } from '@resideo-nest/core/types/scalars/ConstrainedString';

export const Username = ConstrainedString(
  'Username',
  'Account username scalar',
  CoreConfig.username,
);
