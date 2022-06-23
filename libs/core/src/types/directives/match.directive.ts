import {Directive} from '@nestjs/graphql';
import {raw} from "express";

export const Match = (
    pattern: RegExp,
): PropertyDecorator =>
    Directive(`@match(pattern: "${escape(pattern.source)}")`);
