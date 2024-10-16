"use server";

import db from "@/db";

interface CreateGroupActionProps {
  name: string;
  userId: string;
}

export const createGroupAction = async ({
  name,
  userId,
}: CreateGroupActionProps) => {
  try {
    const group = await db.group.create({
      data: {
        name,
        userId,
      },
    });
    return group;
  } catch (error) {
    console.error("Error creating group or public keys:", error);
    return null;
  }
};
