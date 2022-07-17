import {preExecRule} from "@graphql-authz/core";

// TODO: Check if authenticated
export const IsAuthenticated = preExecRule()(context => true);

