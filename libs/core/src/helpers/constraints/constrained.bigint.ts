import {z, ZodBigInt} from 'zod';
import {describeAndApply} from './helper';

ZodBigInt.prototype.min = describeAndApply(
    ZodBigInt.prototype.min,
    (value, message) => `Must be greater than ${value}.`,
);
ZodBigInt.prototype.max = describeAndApply(
    ZodBigInt.prototype.max,
    (value, message) => `Must be less than ${value}.`,
);
ZodBigInt.prototype.gt = describeAndApply(
    ZodBigInt.prototype.gt,
    (value, message) => `Must be greater than ${value}.`,
);
ZodBigInt.prototype.gte = describeAndApply(
    ZodBigInt.prototype.gte,
    (value, message) => `Must be greater than or equal to ${value}.`,
);
ZodBigInt.prototype.lt = describeAndApply(
    ZodBigInt.prototype.lt,
    (value, message) => `Must be less than ${value}.`,
);
ZodBigInt.prototype.lte = describeAndApply(
    ZodBigInt.prototype.lte,
    (value, message) => `Must be less than or equal to ${value}.`,
);
ZodBigInt.prototype.negative = describeAndApply(
    ZodBigInt.prototype.negative,
    (message) => `Must be a negative integer.`,
);
ZodBigInt.prototype.positive = describeAndApply(
    ZodBigInt.prototype.positive,
    (message) => `Must be a positive integer.`,
);
ZodBigInt.prototype.nonnegative = describeAndApply(
    ZodBigInt.prototype.nonnegative,
    (message) => `Must be a non-negative integer.`,
);
ZodBigInt.prototype.nonpositive = describeAndApply(
    ZodBigInt.prototype.nonpositive,
    (message) => `Must be a non-positive integer.`,
);
ZodBigInt.prototype.multipleOf = describeAndApply(
    ZodBigInt.prototype.multipleOf,
    (value, message) => `Must be a multiple of ${value}.`,
);


export const bigIntConstraints = z.bigint;
