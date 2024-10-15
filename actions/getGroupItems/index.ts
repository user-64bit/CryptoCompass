"use server";

import db from "@/db";

interface getGroupItemsActionProps {
  groupId: string;
  userId: string;
}

export const getGroupItemsAction = async ({
  groupId,
  userId,
}: getGroupItemsActionProps) => {
  const groupItems = await db.publicKey.findMany({
    where: {
      groupId,
      userId,
    },
    select: {
      id: true,
      groupId: true,
      name: true,
      blockchain: true,
      balance: true,
    },
  });

  return groupItems;
};
