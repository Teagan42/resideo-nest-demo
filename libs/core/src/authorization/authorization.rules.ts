import {postExecRule, preExecRule} from "@graphql-authz/core";
import {LoggerService} from "@resideo-nest/core/logging";

// TODO: Check if authenticated
export const IsAuthenticated = preExecRule()(context => true);

export const CanReadType = preExecRule()(
  context => {
    const logger = new LoggerService("CanReadType", ['log']);
    logger.log(`headers ${context["headers"]}`)
    logger.log(`userId ${context["userId"]}`)
    logger.log(`claims ${context["claims"]}`)
    return true;
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
    const logger = new LoggerService("CanReadNode", ['log']);
    const claim = `manage:${typeName}:${node["id"]}`;
    logger.log(`headers ${context["headers"]}`)
    logger.log(`userId ${context["userId"]}`)
    logger.log(`claims ${context["claims"]}`)
    logger.log(`claim ${claim}`);
    if (node) {
      logger.log(node);
    }
    return context["claims"].includes(`manage:${typeName}:${node["id"]}`);
  }
)
