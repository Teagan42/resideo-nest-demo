import { InterfaceType } from '@nestjs/graphql';
import { Node } from '@resideo-nest/core';

@InterfaceType(
  'CoreNode',
  {
    description: 'Base interface for polymorphic nodes.',
    isAbstract: true,
    implements: [
      Node,
    ],
  },
)
export class CoreNode
  extends Node {

}
