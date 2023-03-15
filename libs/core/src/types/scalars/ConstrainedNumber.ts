import {ZodNumber} from 'zod';
import {GraphQLError, GraphQLScalarType, Kind, ValueNode} from 'graphql';

export const ConstrainedNumber = (
    name: string,
    description: string,
    constraints: ZodNumber,
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
        ): number => {
          if (valueNode.kind !== Kind.INT && valueNode.kind !== Kind.FLOAT) {
            throw new GraphQLError(
                `[${name}] Value is not number : ${valueNode.kind}`,
            );
          }
          return validate(valueNode.value);
        },
        parseValue: (
            inputValue: unknown,
        ): number => {
          if (typeof inputValue !== 'bigint' && typeof inputValue !== 'number') {
            throw new TypeError(
                `[${name}] Value is not a number : ${typeof inputValue}`,
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
