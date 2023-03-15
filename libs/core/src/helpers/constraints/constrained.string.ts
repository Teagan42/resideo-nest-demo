import {z, ZodString} from 'zod';
import {escapeRegExp} from '@resideo-nest/core/helpers';
import {describeAndApply} from './helper';

ZodString.prototype.max = describeAndApply(
    ZodString.prototype.max,
    (value, message) => `Must be no longer than ${value} characters.`,
);
ZodString.prototype.min = describeAndApply(
    ZodString.prototype.min,
    (value, message) => `Must be longer than ${value} characters.`,
);
ZodString.prototype.length = describeAndApply(
    ZodString.prototype.length,
    (value, message) => `Must be exactly ${value} characters.`,
);
ZodString.prototype.nonempty = describeAndApply(
    ZodString.prototype.nonempty,
    (message) => `Must not be empty.`,
);
ZodString.prototype.trim = describeAndApply(
    ZodString.prototype.trim,
    () => `Will be trimmed.`,
);
ZodString.prototype.toLowerCase = describeAndApply(
    ZodString.prototype.toLowerCase,
    () => `Will be lower cased.`,
);
ZodString.prototype.regex = describeAndApply(
    ZodString.prototype.regex,
    (regex, message) => `Must match ${escapeRegExp(regex)}.`,
);

export const stringConstraints = z.string;
