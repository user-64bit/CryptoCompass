"use server";

import db from "@/db";
import { getCryptoBalanceByPublicKey, getCryptoPriceInUSD } from "@/lib/helper";

interface updateDBActionProps {
  items: {
    id: string;
    name: string;
    userId: string;
    groupId: string;
    blockchain: string;
    balanceCrypto: string;
    cryptoToUSD: string;
  }[];
}

/*
  Todo: if you've better api then you can remove this extra delay.
  [
    I'have api key which give 1 call per second so I need to wait for 1500ms after each api call.
    I'm using this delay to simulate the api call without any error. (just trying to escape the error)
  ]
*/
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateDBAction = async ({ items }: updateDBActionProps) => {
  if (!items) {
    return null;
  }
  const { userId, groupId } = items[0];
  const data = [];

  for (const item of items) {
    const balanceCrypto = await getCryptoBalanceByPublicKey(
      item.blockchain,
      item.name,
    );
    await delay(1500); // delay 1500ms
    const cryptoToUSD = await getCryptoPriceInUSD(item.blockchain);
    await delay(1500); // delay 1500ms

    await db.publicKey.update({
      where: {
        id: item.id,
        userId,
        groupId,
      },
      data: {
        balanceCrypto,
        cryptoToUSD,
      },
    });

    data.push({ id: item.id, balanceCrypto, cryptoToUSD });
  }

  return data;
};
