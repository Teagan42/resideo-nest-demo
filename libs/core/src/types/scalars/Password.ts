import {CoreConfig} from '@resideo-nest/core/config';

import {escapeRegExp, stringConstraints} from '@resideo-nest/core/helpers';
import {
  ConstrainedString
} from '@resideo-nest/core/types/scalars/ConstrainedString';

export const Password = ConstrainedString(
    'Password',
    'Account password scalar',
    stringConstraints().
        regex(RegExp(`^(?=.*?(?:[0-9].*){${CoreConfig.password.minDigits},})$`),
            `String must contain at least ${CoreConfig.password.minDigits} digits.`).
        min(CoreConfig.password.minLength).
        max(CoreConfig.password.maxLength).
        regex(
            RegExp(`^(?=.*?(?:[${escapeRegExp(CoreConfig.password.allowedSymbols)}].*){${CoreConfig.password.minSymbols},})$`),
            `String must contain at least ${CoreConfig.password.minSymbols} of the following ${CoreConfig.password.allowedSymbols}`),
    // CoreConfig.password,
);
