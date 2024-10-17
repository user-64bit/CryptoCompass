"use server";

import db from "@/db";

export const deletePublicKeysAction = async ({
  ids,
  userId,
  groupId,
}: {
  ids: string[];
  userId: string;
  groupId: string;
}) => {
  try {
    await db.publicKey.deleteMany({
      where: {
        id: {
          in: ids,
        },
        userId,
        groupId,
      },
    });
  } catch (error) {
    console.error("Error deleting public key:", error);
    return null;
  }
};
