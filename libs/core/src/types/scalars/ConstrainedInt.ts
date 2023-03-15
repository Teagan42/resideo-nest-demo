import {ZodBigInt} from 'zod';
import {GraphQLError, GraphQLScalarType, Kind, ValueNode} from 'graphql';

export const ConstrainedInt = (
    name: string,
    description: string,
    constraints: ZodBigInt,
): GraphQLScalarType => {
  const validate = (value: string) => {
    return constraints.parse(value);
  };

  return new GraphQLScalarType(
      {
        name: name,
        description: `${description}\n that:` +
            `${constraints.description}`,
        parseLiteral: (
            valueNode: ValueNode,
        ): bigint => {
          if (valueNode.kind !== Kind.INT) {
            throw new GraphQLError(
                `[${name}] Value is not an int : ${valueNode.kind}`,
            );
          }
          return validate(valueNode.value);
        },
        parseValue: (
            inputValue: unknown,
        ): bigint => {
          if (typeof inputValue !== 'bigint') {
            throw new TypeError(
                `[${name}] Value is not an int : ${typeof inputValue}`,
            );
          }
          return validate(inputValue.toString());
        },
        serialize: (outputValue: unknown): string => {
          return outputValue.toString();
        },
      },
  );
};
