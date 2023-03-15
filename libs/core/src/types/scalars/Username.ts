import {CoreConfig} from '@resideo-nest/core/config';

import {escapeRegExp, stringConstraints} from '@resideo-nest/core/helpers';
import {
  ConstrainedString,
} from '@resideo-nest/core/types/scalars/ConstrainedString';

console.log(ConstrainedString);
export const Username = ConstrainedString(
    'Username',
    'Account username scalar',
    stringConstraints().
        regex(RegExp(`^(?=.*?(?:[0-9].*){${CoreConfig.username.minDigits},})$`),
            `String must contain at least ${CoreConfig.username.minDigits} digits.`).
        min(CoreConfig.username.minLength).
        max(CoreConfig.username.maxLength).
        regex(
            RegExp(`^(?=.*?(?:[${escapeRegExp(CoreConfig.username.allowedSymbols)}].*){${CoreConfig.username.minSymbols},})$`),
            `String must contain at least ${CoreConfig.username.minSymbols} of the following ${CoreConfig.username.allowedSymbols}`),
);
