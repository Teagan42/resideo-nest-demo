import { Directive } from '@nestjs/graphql';

export const Maximum = (
  maximum: number,
): PropertyDecorator =>
  Directive(`@maximum(maximum: ${maximum})`);
