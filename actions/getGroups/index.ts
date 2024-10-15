"use server";

import db from "@/db";

interface getGroupsProps {
  email: string;
}

export const getGroups = async ({ email }: getGroupsProps) => {
  const groups = await db.group.findMany({
    where: {
      userId: email,
    },
  });

  return groups;
};
