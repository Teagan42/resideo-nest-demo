import {
  InputType,
  IntersectionType,
} from '@nestjs/graphql';
import { NodeDto } from '@resideo-nest/core/types/inputObjects/NodeDto';
import { Account } from '../../account.model';

@InputType(
  'BaseAccountDto',
  {
    isAbstract: true,
  },
)
export class BaseAccountDto
  extends IntersectionType(
    Account,
    NodeDto,
  ) {

}
