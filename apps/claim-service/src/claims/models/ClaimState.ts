import { registerEnumType } from '@nestjs/graphql';

export enum ClaimState {
  PENDING = 'PENDING',
  GRANTED = 'GRANTED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED'
}

registerEnumType(
  ClaimState,
  {
    name: 'ClaimState',
    description: 'Represents the state or status of a claim',
  },
);
