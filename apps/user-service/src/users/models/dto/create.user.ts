import {
  InputType,
  OmitType,
} from '@nestjs/graphql';
import { User } from '../user.model';

@InputType(
  'CreateUser',
  {
    description: 'Required shape to create a user',
  },
)
export class CreateUser
  extends OmitType(
    User,
    [
      'id',
    ],
  ) {
}
