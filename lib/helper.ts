const blockchainOptions: {
  [key: string]: string;
} = {
  Bitcoin: "BTC",
  Ethereum: "ETH",
  Solana: "SOL",
  Cardano: "ADA",
  Polkadot: "DOT",
  Unknown: "",
};

function uniq(array?: string[]) {
  var seen: { [key: string]: boolean } = {};
  return array?.filter(function (item: string) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

async function getCryptoBalanceByPublicKey(
  blockchain: string,
  publicKey: string,
): Promise<string> {
  if (!blockchainOptions[blockchain]) {
    return "0";
  }
  const url = `https://rest.cryptoapis.io/blockchain-data/${blockchain.toLowerCase()}/mainnet/addresses/${publicKey}/balance`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CRYPTO_API!,
      },
    });
    const data = await response.json();
    return data.data.item.confirmedBalance.amount.toString();
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "0";
  }
}

async function getCryptoPriceInUSD(blockchain: string): Promise<string> {
  const symbol = blockchainOptions[blockchain];
  if (!symbol) {
    return "0";
  }
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CRYPTO_COMPARE_API!,
      },
    });
    const data = await response.json();
    return data.USD.toString();
  } catch (error) {
    console.error("Error fetching USD price:", error);
    return "0";
  }
}

export { uniq, getCryptoBalanceByPublicKey, getCryptoPriceInUSD };
