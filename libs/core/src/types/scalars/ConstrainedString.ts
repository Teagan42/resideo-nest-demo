import {ZodString} from 'zod';
import {GraphQLError, GraphQLScalarType, Kind, ValueNode} from 'graphql';

export const ConstrainedString = (
    name: string,
    description: string,
    constraints: ZodString,
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
        ): string => {
          if (valueNode.kind !== Kind.STRING) {
            throw new GraphQLError(
                `[${name}] Value is not string : ${valueNode.kind}`,
            );
          }
          validate(valueNode.value);
          return valueNode.value;
        },
        parseValue: (
            inputValue: unknown,
        ): string => {
          if (typeof inputValue !== 'string') {
            throw new TypeError(
                `[${name}] Value is not string : ${typeof inputValue}`,
            );
          }
          validate(inputValue);
          return inputValue;
        },
        serialize: (outputValue: unknown): string => {
          return outputValue.toString();
        },
      },
  );
};
