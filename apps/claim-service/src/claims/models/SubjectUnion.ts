import { createUnionType } from "@nestjs/graphql";
import { getTypenameFromId } from "@resideo-nest/core/helpers";
import { Device } from "./device.model";
import { User } from "./user.model";

export const SubjectUnion = createUnionType(
  {
    name: 'Subject',
    types: () => [
      User,
      Device
    ],
    resolveType: (value) => {
      switch(getTypenameFromId(value.id)) {
        case "User":
          return User;
        case "Device":
          return Device;
        default:
          return null;
      }
    }
  }
);
