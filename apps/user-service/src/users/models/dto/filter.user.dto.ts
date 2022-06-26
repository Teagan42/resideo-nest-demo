import {
  InputType,
  PartialType,
} from '@nestjs/graphql';
import { CreateUserDto } from './create.user.dto';

@InputType(
  'FilterUserDto',
  {
    description: 'Required shape to filter users',
  },
)
export class FilterUserDto extends PartialType(CreateUserDto){
}
