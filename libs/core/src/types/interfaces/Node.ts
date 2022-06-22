import {
  Field,
  InterfaceType,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core/types/scalars/NodeID';

@InterfaceType(
  'Node',
  {
    description: 'Interface defining fields common to all Node objects',
  },
)
export abstract class Node {
  @Field(
    () => NodeID,
    {
      name: 'id',
      description: 'The identifier of the node',
    },
  )
  id: string;

  @Field(
    {
      name: 'createdAt',
      description: 'When the node was created',
    },
  )
  createdAt: Date;

  @Field(
    {
      name: 'updatedAt',
      description: 'When the node was last updated',
    },
  )
  updatedAt: Date;
}
