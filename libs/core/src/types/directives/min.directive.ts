import { Directive } from '@nestjs/graphql';

export const Minimum = (
  minimum: number,
): PropertyDecorator =>
  Directive(`@minimum(minimum: ${minimum}`);
