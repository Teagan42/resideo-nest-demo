import { StringConstraints } from '@resideo-nest/core/config';
import { escapeRegExp } from '@resideo-nest/core/helpers';
import {
  GraphQLError,
  GraphQLScalarType,
  Kind,
  ValueNode,
} from 'graphql';

export const ConstrainedString = (
  name: string,
  description: string,
  constraints: StringConstraints,
): GraphQLScalarType => {
  const {
    allowedSymbols,
    minLength,
    maxLength,
    minDigits,
    minSymbols,
  } = constraints;
  const allowedSymbolsRegex =
    RegExp(`^(?=.*?(?:[${escapeRegExp(allowedSymbols)}].*){${minSymbols},})$`);
  const digitsRegex = RegExp(`^(?=.*?(?:\d.*){${minDigits},})$`);
  const lengthRegex = RegExp(`^(?:.{${minLength},${maxLength}})$`);
  const validate = (value: string) => {
    if (!allowedSymbolsRegex.test(value)) {
      throw new GraphQLError(
        `[${name}] Value must contain at least ${minSymbols} of ${allowedSymbols}`,
      );
    }
    if (!digitsRegex.test(value)) {
      throw new GraphQLError(
        `[${name}] Value must contain at least ${minDigits} numbers`,
      );
    }
    if (!lengthRegex.test(value)) {
      throw new GraphQLError(
        `[${name}] Value must be between ${minLength} and ${maxLength} characters`,
      );
    }
  };

  const lengthDescription = `is between ${constraints.minLength} and ${constraints.maxLength} characters`;
  const numberDescription = `contains at least ${constraints.minDigits} numbers`;
  const symbolDescription = `contains at least ${constraints.minSymbols} symbols`;
  const allowedSymbolDescription = `consists of only alpha-number characters or ${constraints.allowedSymbols}`;

  return new GraphQLScalarType(
    {
      name: name,
      description: `${description}\n that` +
                   `* ${lengthDescription}\n` +
                   `* ${numberDescription}\n` +
                   `* ${symbolDescription}\n` +
                   `* ${allowedSymbolDescription}`,
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
        // TODO: Hash
        return outputValue.toString();
      },
    },
  );
};
