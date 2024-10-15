"use server";

import db from "@/db";

interface modifyBlockChainProps {
  id: string;
  email: string;
}

export const modifyBlockChain = async ({
  id,
  email,
}: modifyBlockChainProps) => {
  // Todo: modify the blockchain of the group
};
