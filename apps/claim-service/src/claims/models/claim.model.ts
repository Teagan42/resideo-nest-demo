import {
  Directive,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  DateTime,
  FieldName,
  Node,
  NodeId,
  ObjectName,
} from '@resideo-nest/core';
import { ClaimState } from './ClaimState';
import { SubjectUnion } from './SubjectUnion';

@ObjectType(
  {
    description: 'Permission claim',
    implements: [
      Node,
    ],
  },
)
@Directive('@key(fields: "id")')
export class Claim
  extends Node {
  @Field(
    () => NodeId,
    {
      name: 'grantorId',
      description: 'Distinct identifier of the node granting this claim',
    },
  )
  grantorId: string;

  @Field(
    () => SubjectUnion,
    {
      name: 'grantor',
      description: 'The node granting this claim',
    },
  )
  grantor: Node;

  @Field(
    () => NodeId,
    {
      name: 'granteeId',
      description: 'Distinct identifier of the node being granted this claim',
    },
  )
  granteeId: string;

  @Field(
    () => SubjectUnion,
    {
      name: 'grantee',
      description: 'Distinct identifier of the node being granted this claim',
    },
  )
  grantee: Node;

  @Field(
    () => DateTime,
    {
      name: 'expiresAt',
      description: 'The point in time at which this claim is no longer valid, if null then it does not expire',
      nullable: true,
    },
  )
  expiresAt?: Date;

  @Field(
    {
      name: 'action',
      description: 'The action that is granted by this claim',
    },
  )
  action: string;

  @Field(
    () => ObjectName,
    {
      name: 'subject',
      description: 'The name of the object subject to this claim, if null claim is global',
      nullable: true,
    },
  )
  subject?: string;

  @Field(
    () => NodeId,
    {
      name: 'subjectId',
      description: 'The specific subject identified by this identifier',
      nullable: true,
    },
  )
  subjectId?: string;

  @Field(
    () => SubjectUnion,
    {
      name: 'subjectNode',
      description: 'The node identified by the subject and id',
      nullable: true,
    },
  )
  subjectNode?: Node;

  @Field(
    () => FieldName,
    {
      name: 'field',
      description: 'The name of the field belonging to the subject to this claim, if null claim is object-level',
      nullable: true,
    },
  )
  field?: string;

  @Field(
    () => ClaimState,
    {
      name: 'state',
      description: 'The current state of this claim.',
      defaultValue: ClaimState.PENDING,
    },
  )
  state: ClaimState;
}
