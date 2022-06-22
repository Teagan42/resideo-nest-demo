import {
  Field,
  InterfaceType,
} from '@nestjs/graphql';
import { NodeID } from '@resideo-nest/core/types/scalars/NodeID';

@InterfaceType(
  'Node',
  {
    description: '',
  },
)
export abstract class Node {
  @Field(
    () => NodeID,
    {
      description: 'The identifier of the node',
    },
  )
  id: string;

  @Field(
    {
      description: 'When the node was created',
    },
  )
  createdAt: Date;

  @Field(
    {
      description: 'When the node was last updated',
    },
  )
  updatedAt: Date;
}
