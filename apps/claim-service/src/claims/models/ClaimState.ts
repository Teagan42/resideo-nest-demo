import { registerEnumType } from '@nestjs/graphql';

export enum ClaimState {
  PENDING,
  GRANTED,
  EXPIRED,
  REVOKED
}

registerEnumType(
  ClaimState,
  {
    name: 'ClaimState',
    description: 'Represents the state or status of a claim',
  },
);
