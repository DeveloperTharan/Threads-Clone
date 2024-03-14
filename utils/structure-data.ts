import { Command, User } from "@prisma/client";

interface CommandNode extends Command {
  user: User;
  children?: CommandNode[];
}

export const StructureData = (
  commandsArray: CommandNode[],
  parentId: string | null = null
): CommandNode[] => {
  return commandsArray
    .filter((command) => command.parentId === parentId)
    .map((command) => ({
      ...command,
      user: structuredClone(command.user),
      children: StructureData(commandsArray, command.id),
    }));
};
