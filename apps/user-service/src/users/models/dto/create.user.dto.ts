import {
  InputType,
  OmitType,
} from '@nestjs/graphql';
import { User } from '../user.model';

@InputType(
  'CreateUserDto',
  {
    description: 'Required shape to create a user',
  },
)
export class CreateUserDto
  extends OmitType(
    User,
    [
      'id',
      'createdAt',
      'updatedAt'
    ],
  ) {
}
