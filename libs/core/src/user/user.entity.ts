import {
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn(
    {
      type: 'string',
    },
  )
  id!: string;
}
