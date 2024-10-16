"use server";

import db from "@/db";
import { getCryptoBalanceByPublicKey, getCryptoPriceInUSD } from "@/lib/helper";

export const addPublicKeyAction = async ({
  userId,
  nickName,
  groupId,
  blockchain,
  publicKey,
}: {
  userId: string;
  nickName: string;
  groupId: string;
  blockchain: string;
  publicKey: string;
}) => {
  const existingPkeys = await db.publicKey.findMany({
    where: {
      userId,
      groupId,
    },
    select: {
      name: true,
    },
  });
  const existingPkeysList = existingPkeys.map((pkey) => pkey.name);
  if (existingPkeysList.includes(publicKey)) {
    // Todo: write something useful to send to client side
    return null;
  }
  try {
    const data = await db.publicKey.create({
      data: {
        name: publicKey,
        nickName,
        userId,
        groupId,
        blockchain,
        balanceCrypto: await getCryptoBalanceByPublicKey(blockchain, publicKey),
        cryptoToUSD: await getCryptoPriceInUSD(blockchain),
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating group or public keys:", error);
    return null;
  }
};
