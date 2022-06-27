import {
  GraphQLError,
  GraphQLScalarType,
  Kind,
  ValueNode,
  assertValidName as assertValidTypeName
} from 'graphql';

export const GraphQLNameString = (
  name: string,
  reference: string,
): GraphQLScalarType => {
  return new GraphQLScalarType(
    {
      name: name,
      description: `A string that can be used to specify a GraphQL defined ${reference}'s name\n` +
                   `Names must:\n` +
                   `* Be a non-empty string\n` +
                   `* Only contain [_a-zA-Z0-9]\n` +
                   `* Start with [_a-zA-Z]`,
      parseLiteral: (
        valueNode: ValueNode,
      ): string => {
        if (valueNode.kind !== Kind.STRING) {
          throw new GraphQLError(
            `[${name}] Value is not string : ${valueNode.kind}`,
          );
        }

        try {
          assertValidTypeName(valueNode.value);
        } catch (error) {
          throw new GraphQLError(
            `[${name}] ${error.message}`,
          );
        }

        return valueNode.value;
      },
      parseValue: (inputValue: unknown): string => {
        if (typeof inputValue !== 'string') {
          throw new TypeError(
            `[${name}] Value is not string : ${typeof inputValue}`,
          );
        }

        try {
          assertValidTypeName(inputValue);
        } catch (error) {
          throw new TypeError(`[${name}] ${error.message}`);
        }

        return inputValue;
      },
      serialize: (outputValue: unknown): string => {
        return outputValue as string;
      },
    },
  )
};
