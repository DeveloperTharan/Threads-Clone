import { Commands, User } from "@prisma/client";

export const StructureData = (
  commandsArray: (Commands & { user: User })[],
  parentId: string | null = null
): (Commands & { user: User })[] => {
  return commandsArray
    .filter((command) => command.parentId === parentId)
    .map((command) => ({
      ...command,
      user: structuredClone(command.user),
      children: StructureData(commandsArray, command.id),
    }));
};
