import {
  CustomScalar,
  Scalar,
} from '@nestjs/graphql';
import {
  GraphQLError,
  Kind,
  ValueNode,
} from 'graphql';

const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z\d.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/,
);

@Scalar(
  'Email',
)
export class Email
  implements CustomScalar<string, string> {
  description = 'Global Email custom scalar type';

  parseLiteral(
    valueNode: ValueNode,
  ): string {
    if (valueNode.kind !== Kind.STRING) {
      throw new GraphQLError(
        `[EmailScalar] Value is not string : ${valueNode.kind}`,
      );
    }
    if (!EMAIL_REGEX.test(valueNode.value)) {
      throw new GraphQLError(
        `[EmailScalar] Value is not a valid email address: ${valueNode.value}`,
      );
    }
    return valueNode.value;
  }

  parseValue(inputValue: any): string {
    if (typeof inputValue !== 'string') {
      throw new TypeError(
        `[EmailScalar] Value is not string: ${typeof inputValue}`,
      );
    }

    if (!EMAIL_REGEX.test(inputValue)) {
      throw new TypeError(
        `[EmailScalar] Value is not a valid email address: ${inputValue}`,
      );
    }

    return inputValue;
  }

  serialize(outputValue: unknown): string {
    return outputValue as string;
  }
}
