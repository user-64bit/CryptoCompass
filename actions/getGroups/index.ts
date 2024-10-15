"use server";

import db from "@/db";

interface getGroupsActionProps {
  email: string;
}

export const getGroupsAction = async ({ email }: getGroupsActionProps) => {
  const groups = await db.group.findMany({
    where: {
      userId: email,
    },
    select: {
      id: true,
      name: true,
      userId: true,
    },
  });

  return groups;
};
