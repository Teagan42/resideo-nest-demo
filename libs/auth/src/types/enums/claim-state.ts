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
    valuesMap: {
      PENDING: {
        description: 'Claim is created and awaiting action',
      },
      GRANTED: {
        description: 'Claim is actively valid',
      },
      EXPIRED: {
        description: 'Claim is no longer valid',
      },
      REVOKED: {
        description: 'Claim has been revoked and is not longer valid',
      },
    },
  },
);
