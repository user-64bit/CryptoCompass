"use server";

import db from "@/db";

interface modifyBlockChainProps {
  id: string;
  groupId: string;
  blockchain: string;
}

export const modifyBlockChain = async ({
  id,
  groupId,
  blockchain,
}: modifyBlockChainProps) => {
  const data = await db.publicKey.update({
    where: {
      id,
      groupId,
    },
    data: {
      blockchain,
    },
  });
  return data;
};
