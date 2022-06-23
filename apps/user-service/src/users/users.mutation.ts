import { Mutation } from '@nestjs/graphql';

@Mutation(
  {
    name: "rankUp",
    description: "Increase the rank of a user."
  }
)
