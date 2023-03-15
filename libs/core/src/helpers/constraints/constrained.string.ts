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
ZodString.prototype.email = describeAndApply(
    ZodString.prototype.email,
    (message) => `Must be a valid email address.`,
);
ZodString.prototype.url = describeAndApply(
    ZodString.prototype.url,
    (message) => `Must be a valid URL.`,
);
ZodString.prototype.emoji = describeAndApply(
    ZodString.prototype.emoji,
    (message) => `Must contain an emoji.`,
);
ZodString.prototype.uuid = describeAndApply(
    ZodString.prototype.uuid,
    (message) => `Must be a valid UUID.`,
);
ZodString.prototype.cuid = describeAndApply(
    ZodString.prototype.cuid,
    (message) => `Must be a valid CUID.`,
);
ZodString.prototype.cuid2 = describeAndApply(
    ZodString.prototype.cuid2,
    (message) => `Must be a valid CUID2.`,
);
ZodString.prototype.ulid = describeAndApply(
    ZodString.prototype.ulid,
    (message) => `Must be a valid ULID.`,
);
ZodString.prototype.ip = describeAndApply(
    ZodString.prototype.ip,
    (options?: string | { version?: 'v4' | 'v6'; message?: string }) => `Must be a valid IP.`,
);
ZodString.prototype.datetime = describeAndApply(
    ZodString.prototype.datetime,
    (
        options?:
            | string
            | {
          message?: string | undefined;
          precision?: number | null;
          offset?: boolean
        }) => `Must be a valid datetime.`,
);
ZodString.prototype.includes = describeAndApply(
    ZodString.prototype.includes,
    (
        value: string,
        options?: { message?: string; position?: number }) => `Must include the substring ${value}.`,
);
ZodString.prototype.startsWith = describeAndApply(
    ZodString.prototype.startsWith,
    (value, message) => `Must be begin with the string ${value}.`,
);
ZodString.prototype.endsWith = describeAndApply(
    ZodString.prototype.endsWith,
    (value, message) => `Must be end with the string ${value}.`,
);

export const stringConstraints = z.string;
