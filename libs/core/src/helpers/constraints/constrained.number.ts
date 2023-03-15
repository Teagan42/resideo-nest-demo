import {z, ZodNumber} from 'zod';
import {describeAndApply} from './helper';

ZodNumber.prototype.min = describeAndApply(
    ZodNumber.prototype.min,
    (value, message) => `Must be greater than ${value}.`,
);
ZodNumber.prototype.max = describeAndApply(
    ZodNumber.prototype.max,
    (value, message) => `Must be less than ${value}.`,
);
ZodNumber.prototype.gt = describeAndApply(
    ZodNumber.prototype.gt,
    (value, message) => `Must be greater than ${value}.`,
);
ZodNumber.prototype.gte = describeAndApply(
    ZodNumber.prototype.gte,
    (value, message) => `Must be greater than or equal to ${value}.`,
);
ZodNumber.prototype.lt = describeAndApply(
    ZodNumber.prototype.lt,
    (value, message) => `Must be less than ${value}.`,
);
ZodNumber.prototype.lte = describeAndApply(
    ZodNumber.prototype.lte,
    (value, message) => `Must be less than or equal to ${value}.`,
);
ZodNumber.prototype.negative = describeAndApply(
    ZodNumber.prototype.negative,
    (message) => `Must be a negative integer.`,
);
ZodNumber.prototype.positive = describeAndApply(
    ZodNumber.prototype.positive,
    (message) => `Must be a positive integer.`,
);
ZodNumber.prototype.nonnegative = describeAndApply(
    ZodNumber.prototype.nonnegative,
    (message) => `Must be a non-negative integer.`,
);
ZodNumber.prototype.nonpositive = describeAndApply(
    ZodNumber.prototype.nonpositive,
    (message) => `Must be a non-positive integer.`,
);
ZodNumber.prototype.multipleOf = describeAndApply(
    ZodNumber.prototype.multipleOf,
    (value, message) => `Must be a multiple of ${value}.`,
);
ZodNumber.prototype.int = describeAndApply(
    ZodNumber.prototype.int,
    (message) => `Must be an integer.`,
);
ZodNumber.prototype.finite = describeAndApply(
    ZodNumber.prototype.finite,
    (message) => `Must be a finite number.`,
);
ZodNumber.prototype.safe = describeAndApply(
    ZodNumber.prototype.safe,
    (message) => `Must be an integer between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}.`,
);


export const numberConstraints = z.number();
