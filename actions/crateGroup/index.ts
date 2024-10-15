"use server";

import db from "@/db";

interface CreateGroupProps {
  name: string;
  publicKeys: string;
  email: string;
}

export const createGroup = async ({
  name,
  publicKeys,
  email,
}: CreateGroupProps) => {
  const group = await db.group.create({
    data: {
      name,
      public_keys: publicKeys,
      userId: email,
    },
  });

  return group;
};
