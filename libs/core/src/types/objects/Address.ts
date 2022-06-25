import {
  Field,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import {
  CountryCode,
  PostalCode,
} from '@resideo-nest/core';

@ObjectType(
  "Address",
  {
    description: "Postal address",
  }
)
@InputType(
  "AddressDto",
  {
    description: "Address DTO"
  }
)
export class Address {
  @Field(
    {
      name: "line1",
      description: "Street address line 1"
    }
  )
  line1: string;

  @Field(
    {
      name: "line2",
      description: "Street address line 2",
      nullable: true,
    }
  )
  line2?: string;

  @Field(
    {
      name: "city",
      description: "City name",
    }
  )
  city: string;

  @Field(
    {
      name: "region",
      description: "State or region code",
    }
  )
  region: string;

  @Field(
    () => PostalCode,
    {
      name: "postalCode",
      description: "Postal code",
    }
  )
  postalCode: string;

  @Field(
    () => CountryCode,
    {
      name: "countryCode",
      description: "Country code identifier"
    }
  )
  countryCode: string;
}
