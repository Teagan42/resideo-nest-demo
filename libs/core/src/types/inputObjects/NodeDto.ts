import {
  InputType,
  OmitType,
} from '@nestjs/graphql';
import { Node } from '@resideo-nest/core/types';

@InputType(
  {
    description: 'Base node DTO',
    isAbstract: true,
  },
)
export class NodeDto
  extends OmitType(
    Node,
    [
      'id',
      'createdAt',
      'updatedAt',
    ],
  ) {

}
