"use server";

import db from "@/db";

export const dropGroupAction = async ({ groupId }: { groupId: string }) => {
  try {
    await db.group.delete({
      where: {
        id: groupId,
      },
    });
  } catch (error) {
    console.error("Error deleting group:", error);
    return null;
  }
};
