import {
  InputType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { BaseUserDto } from './base.user.dto';
import { CreateUserDto } from './create.user.dto';

@InputType(
  'FilterUserDto',
  {
    description: 'Required shape to filter users',
  },
)
export class FilterUserDto extends PartialType(CreateUserDto){
}
