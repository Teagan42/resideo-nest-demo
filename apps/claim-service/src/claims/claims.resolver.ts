import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {
  LoggerService,
  Node,
  NodeId,
} from '@resideo-nest/core';
import { getTypenameFromId } from '@resideo-nest/core/helpers';
import { ClaimsService } from './claims.service';
import { Claim } from './models/claim.model';
import { ClaimState } from './models/ClaimState';
import { CreateClaimDto } from './models/dto/create.claim.dto';
import { FilterClaimDto } from './models/dto/filter.claim.dto';
import { SetClaimDto } from './models/dto/set.claim.dto';
import { SubjectUnion } from './models/SubjectUnion';

@Resolver((of) => Claim)
export class ClaimsResolver {
  constructor(
    private readonly logger: LoggerService,
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
    this.logger.log("Getting claims");
    return this.claimsService.all();
  }

  @Query(
    (returns) => [Claim],
    {
      name: 'pendingClaims',
      description: 'Gets pending claims for the given node',
    },
  )
  async pendingClaims(@Args(
    'id',
    {
      type: () => NodeId,
    },
  ) id: string): Promise<Claim[]> {
    return this.claimsService.findByGrantee(id)
      .filter((claim) => claim.state === ClaimState.PENDING);
  }

  @Query(
    (returns) => [Claim],
    {
      name: 'activeClaims',
      description: 'Gets active claims for the given node',
    },
  )
  async activeClaims(@Args(
    'id',
    {
      type: () => NodeId,
    },
  ) id: string): Promise<Claim[]> {
    return this.claimsService.findByGrantee(id)
               .filter((claim) => claim.state === ClaimState.GRANTED);
  }

  @Query(
    (returns) => [SubjectUnion],
    {
      name: 'claimsOn',
      description: 'Gets claims for the given subject',
    },
  )
  async claimsOn(@Args(
    'id',
    {
      type: () => NodeId,
    },
  ) id: string): Promise<Node[]> {
    return this.claimsService.all()
               .filter((claim) => claim.subjectId === id)
      .map((claim) => claim.grantee);
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
                   criteria.granteeId
                   ? claim.granteeId === criteria.granteeId
                   : true,
               )
               .filter(
                 (claim) =>
                   criteria.grantorId
                   ? claim.grantorId === criteria.grantorId
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

  @ResolveField(
    () => Node,
  )
  grantor(@Parent() claim: Claim): any {
    return {
      __typeName: getTypenameFromId(claim.grantorId),
      id: claim.grantorId
    }
  }

  @ResolveField(
    () => Node,
  )
  grantee(@Parent() claim: Claim): any {
    return {
      __typeName: getTypenameFromId(claim.granteeId),
      id: claim.granteeId
    }
  }

  @ResolveField(
    () => SubjectUnion,
  )
  subjectNode(@Parent() claim: Claim): any {
    if (!claim.subjectId || !claim.subject) {
      return null;
    }
    return {
      __typeName: claim.subject,
      id: claim.subjectId
    }
  }

  @Mutation(
    () => Claim,
    {
      name: "setClaim",
      description: "Set a claim state"
    }
  )
  async setClaim(
    @Args(
      'input',
      {type: () => SetClaimDto}
    ) input: SetClaimDto
  ): Promise<Claim> {
    return this.claimsService.setState(input.id, input.state);
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
    const claim = this.claimsService.create(input);
    claim.grantor = this.grantor(claim);
    claim.grantee = this.grantee(claim);
    claim.subjectNode = this.subjectNode(claim);
    this.logger.log(claim);
    return claim;
  }
}
