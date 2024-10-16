"use server";

import db from "@/db";
import { getBlockChainByPublicKey } from "@/lib/getBlockChainByPublicKey";
import {
  getCryptoBalanceByPublicKey,
  getCryptoPriceInUSD,
  uniq,
} from "@/lib/helper";

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

    const publicKeyData = await Promise.all(
      uniqePublicKeys.map(async (publicKey) => {
        const blockchain = getBlockChainByPublicKey(publicKey);
        const balanceCrypto = await getCryptoBalanceByPublicKey(
          blockchain,
          publicKey,
        );
        const cryptoToUSD = await getCryptoPriceInUSD(blockchain);
        return {
          name: publicKey.trim(),
          userId,
          groupId: group.id,
          balanceCrypto,
          cryptoToUSD,
          blockchain,
        };
      }),
    );
    const items = await db.publicKey.createMany({
      data: publicKeyData,
    });

    return group;
  } catch (error) {
    console.error("Error creating group or public keys:", error);
    return null;
  }
};
