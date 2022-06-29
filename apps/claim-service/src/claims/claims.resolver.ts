import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {
  CreateClaimDto,
  NodeId,
} from '@resideo-nest/core';
import { ClaimsService } from './claims.service';
import { Claim } from './models/claim.model';
import { FilterClaimDto } from './models/dto/filter.claim.dto';

@Resolver((of) => Claim)
export class ClaimsResolver {
  constructor(
    private readonly claimsService: ClaimsService,
  ) {
  }

  @Query(
    (returns) => [Claim],
    {
      name: 'allClaims',
      description: 'Returns all claims in the store',
    },
  )
  async getAllClaims(): Promise<Claim[]> {
    return this.claimsService.all();
  }

  @Query(
    (returns) => Claim,
    {
      name: 'getClaimById',
      description: 'Returns the claim with the given id',
    },
  )
  async getClaim(@Args(
    'id',
    {
      type: () => NodeId,
    },
  ) id: string): Promise<Claim> {
    return this.claimsService.findById(id);
  }

  @Query(
    () => [Claim],
    {
      name: 'filterClaims',
      description: 'Returns claims matching the filter criteria',
    },
  )
  async filterClaims(@Args(
    'criteria',
    {
      type: () => FilterClaimDto,
    },
  ) criteria: FilterClaimDto): Promise<Claim[]> {
    return this.claimsService
               .all()
               .filter(
                 (claim) =>
                   criteria.action
                   ? claim.action === criteria.action
                   : true,
               )
               .filter(
                 (claim) =>
                   criteria.subject
                   ? claim.subject === criteria.subject
                   : true,
               )
               .filter(
                 (claim) =>
                   criteria.subjectId
                   ? claim.subjectId === criteria.subjectId
                   : true,
               )
               .filter(
                 (claim) =>
                   criteria.field
                   ? claim.field === criteria.field
                   : true,
               )
               .filter(
                 (claim) =>
                   criteria.grantee
                   ? claim.grantee === criteria.grantee
                   : true,
               )
               .filter(
                 (claim) =>
                   criteria.grantor
                   ? claim.grantor === criteria.grantor
                   : true,
               )
               .filter(
                 (claim) =>
                   criteria.state
                   ? claim.state === criteria.state
                   : true,
               );
  }

  @ResolveReference()
  resolveReference(
    reference: { __typename: string, id: string },
  ): Claim {
    return this.claimsService.findById(reference.id);
  }

  @Mutation(
    () => Claim,
    {
      name: 'createClaim',
      description: 'Create a new claim',
    },
  )
  async createClaim(
    @Args(
      'input',
      { type: () => CreateClaimDto },
    ) input: CreateClaimDto): Promise<Claim> {
    return new Claim();
  }
}
