import {
  InputType,
  PickType,
} from '@nestjs/graphql';
import { BaseAccountDto } from './base.account.dto';

@InputType(
  'ChangeAccountDto',
  {
    description: 'Required shape to change an account',
  },
)
export class CreateAccountDto
  extends PickType(
    BaseAccountDto,
    [
      'password',
    ],
  ) {

}
