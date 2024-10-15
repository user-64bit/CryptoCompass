"use server";

import db from "@/db";
import { getBlockChainByPublicKey } from "@/lib/getBlockChainByPublicKey";
import { uniq } from "@/lib/helper";

interface CreateGroupActionProps {
  name: string;
  publicKeys: string;
  userId: string;
}

export const createGroupAction = async ({
  name,
  publicKeys,
  userId,
}: CreateGroupActionProps) => {
  const uniqePublicKeys = uniq(publicKeys.split(",").map((key) => key.trim()));
  if (!uniqePublicKeys) {
    return null;
  }
  try {
    const group = await db.group.create({
      data: {
        name,
        userId,
      },
    });

    const items = await db.publicKey.createMany({
      data: uniqePublicKeys.map((publicKey) => ({
        name: publicKey,
        userId,
        groupId: group.id,
        blockchain: getBlockChainByPublicKey(publicKey),
      })),
    });

    return group;
  } catch (error) {
    console.error("Error creating group or public keys:", error);
    return null;
  }
};
