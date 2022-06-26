import {
  InputType,
  PickType,
} from '@nestjs/graphql';
import { BaseAccountDto } from './base.account.dto';

@InputType(
  'CreateAccountDto',
  {
    description: 'Required shape to create an account',
  },
)
export class CreateAccountDto
  extends PickType(
    BaseAccountDto,
    [
      'username',
      'password',
    ],
  ) {

}
