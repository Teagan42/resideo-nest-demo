import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { BaseUserDto } from './base.user.dto';

@InputType(
  'UpdateUserDto',
  {
    description: 'Required shape to update a user',
  },
)
export class UpdateUserDto
  extends IntersectionType(
    PickType(
      BaseUserDto,
      [
        'id',
      ],
    ),
    PartialType(
      PickType(
        BaseUserDto,
        [
          'firstName',
          'lastName',
          'phoneNumber',
          'email',
          'address',
        ],
      ),
    ),
  ) {
}
