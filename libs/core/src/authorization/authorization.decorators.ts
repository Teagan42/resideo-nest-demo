import {IAuthConfig} from "@graphql-authz/core";
import {RulesObject} from "@graphql-authz/core/dist/rules";
import {Extensions} from "@nestjs/graphql";

export function AuthZ(args: IAuthConfig<RulesObject>) {
  return Extensions({
    authz: {
      directives: [
        {
          name: 'authz',
          arguments: args
        }
      ]
    }
  });
}