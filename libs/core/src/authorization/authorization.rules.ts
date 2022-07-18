import {postExecRule, preExecRule} from "@graphql-authz/core";
import {LoggerService} from "@resideo-nest/core/logging";

// TODO: Check if authenticated
export const IsAuthenticated = preExecRule()(context => true);

export const CanReadType = <NodeType>(typeName: string) => preExecRule()(
  (
    context,
    fieldArgs,
  ) => {
    const logger = new LoggerService("CanReadType", ['log']);
    logger.log(`claims ${context["claims"]}`)
    logger.log(`contextKeys ${Object.keys(context)}`)
    return context["claims"].some(
      (claim) => claim.includes(typeName)
    );
  }
)

export const CanReadNode = <NodeType>(typeName: string) => postExecRule(
  {
    error: "Unable to manage Device"
    // selectionSet: `{ ${typeName} { id } }`
  }
)(
  (
    context,
    fieldArgs,
    node: NodeType,
    parent: unknown
  ) => {
    // const logger = new LoggerService("CanReadNode", ['log']);
    const claim = `manage:${typeName}:${node["id"]}`;
    // logger.log(`headers ${context["headers"]}`)
    // logger.log(`userId ${context["userId"]}`)
    // logger.log(`claims ${context["claims"]}`)
    // logger.log(`claim ${claim}`);
    // if (node) {
    //   logger.log(node);
    // }
    return context["claims"].includes(claim);
  }
)
