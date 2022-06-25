import { isBase64 } from '@resideo-nest/core/helpers';
import {
  GraphQLError,
  GraphQLScalarType,
  Kind,
  ValueNode,
} from 'graphql';

export const NodeID = new GraphQLScalarType(
  {
    name: 'NodeID',
    description: 'Global NodeID custom scalar type',
    parseLiteral: (
      valueNode: ValueNode,
    ): string => {
      if (valueNode.kind !== Kind.STRING) {
        throw new GraphQLError(
          `[NodeIdScalar] Value is not string : ${valueNode.kind}`,
        );
      }
      // TODO: toId if correct format
      if (!isBase64(valueNode.value)) {
        throw new GraphQLError(
          `[NodeIdScalar] Value is not base64 encoded.`,
        );
      }

      return valueNode.value;
    },
    parseValue: (inputValue: unknown): string => {
      if (typeof inputValue !== 'string') {
        throw new TypeError(
          `[NodeIDScalar] Value is not string: ${typeof inputValue}`,
        );
      }
      if (!isBase64(inputValue)) {
        throw new TypeError(
          `[NodeIDScalar] Value is not base64 encoded: ${inputValue}`,
        );
      }
      return inputValue;
    },
    serialize: (outputValue: unknown): string => {
      return outputValue as string;
    },
  },
);
