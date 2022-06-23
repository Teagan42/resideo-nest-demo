import {
  ArgsType,
  Field,
  InputType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { User } from '../user.model';

@InputType(
  'RankUpDto',
  {
    description: 'Data needed to rank up a user',
  },
)
export class RankUpDto
  extends PickType(
    User,
    ['id'] as const,
  ) {
  @Field(
    {
      name: 'rankDelta',
      description: 'The delta to apply to User Rank',
    },
  )
  rankDelta: number;
}
