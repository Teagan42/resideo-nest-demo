import {
  Abstract,
  Type,
} from '@nestjs/common';

export type InjectionToken =
  | string
  | symbol
  | Type<any>
  | Abstract<any>
  | Function;
