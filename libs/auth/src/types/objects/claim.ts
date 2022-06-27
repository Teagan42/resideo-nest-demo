import { Field } from '@nestjs/graphql';
import { ClaimState } from '@resideo-nest/auth-plugin/types/enums/claim-state';
import {
  DateTime,
  FieldName,
  Node,
  NodeId,
  ObjectName,
} from '@resideo-nest/core';


export class Claim extends Node {
  @Field(
    () => NodeId,
    {
      name: 'grantor',
      description: 'Distinct identifier of the node granting this claim',
    }
  )
  grantor: string;

  @Field(
    () => NodeId,
    {
      name: 'grantee',
      description: 'Distinct identifier of the node being granted this claim',
    }
  )
  grantee: string;

  @Field(
    () => DateTime,
    {
      name: 'expiresAt',
      description: 'The point in time at which this claim is no longer valid, if null then it does not expire',
      nullable: true,
    }
  )
  expiresAt?: Date;

  @Field(
    {
      name: 'action',
      description: 'The action that is granted by this claim'
    }
  )
  action: string;

  @Field(
    () => ObjectName,
    {
      name: 'subject',
      description: 'The name of the object subject to this claim, if null claim is global',
      nullable: true
    }
  )
  subject?: string;

  @Field(
    () => NodeId,
    {
      name: 'subjectId',
      description: 'The specific subject identified by this identifier'
    }
  )
  subjectId?: string;

  @Field(
    () => FieldName,
    {
      name: 'field',
      description: 'The name of the field belonging to the subject to this claim, if null claim is object-level',
      nullable: true
    }
  )
  field?: string;

  @Field(
    () => ClaimState,
    {
      name: 'state',
      description: 'The current state of this claim.',
      defaultValue: ClaimState.PENDING,
    }
  )
  state: ClaimState;
}
