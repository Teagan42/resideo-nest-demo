import {
  InputType,
  PickType,
} from '@nestjs/graphql';
import { BaseUserDto } from './base.user.dto';

@InputType(
  'CreateUserDto',
  {
    description: 'Required shape to create a user',
  },
)
export class CreateUserDto
  extends PickType(
    BaseUserDto,
    [
      'username',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'email',
      'address',
    ],
  ) {
}
