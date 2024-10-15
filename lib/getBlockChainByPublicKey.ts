type Blockchain =
  | "Bitcoin"
  | "Ethereum"
  | "Solana"
  | "Cardano"
  | "Polkadot"
  | "Unknown";

/**
 * Function to identify the blockchain from a given public key.
 * @param publicKey The public key to analyze.
 * @returns The blockchain the public key belongs to.
 */
function getBlockChainByPublicKey(publicKey: string): Blockchain {
  if (isBitcoinKey(publicKey)) {
    return "Bitcoin";
  } else if (isEthereumKey(publicKey)) {
    return "Ethereum";
  } else if (isSolanaKey(publicKey)) {
    return "Solana";
  } else if (isCardanoKey(publicKey)) {
    return "Cardano";
  } else if (isPolkadotKey(publicKey)) {
    return "Polkadot";
  } else {
    return "Unknown";
  }
}

/**
 * Checks if the given public key matches Bitcoin's format.
 * @param publicKey The public key to check.
 * @returns True if it's a valid Bitcoin public key.
 */
function isBitcoinKey(publicKey: string): boolean {
  // P2PKH or P2SH addresses (start with 1 or 3) are 26-34 characters
  const legacyRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
  // Bech32 addresses start with "bc1" and can be up to 90 characters
  const bech32Regex = /^bc1[a-zA-HJ-NP-Z0-9]{11,90}$/;

  return legacyRegex.test(publicKey) || bech32Regex.test(publicKey);
}
/**
 * Checks if the given public key matches Ethereum's format.
 * @param publicKey The public key to check.
 * @returns True if it's a valid Ethereum public key.
 */
function isEthereumKey(publicKey: string): boolean {
  return publicKey.startsWith("0x") && publicKey.length === 42;
}

/**
 * Checks if the given public key matches Solana's format.
 * @param publicKey The public key to check.
 * @returns True if it's a valid Solana public key.
 */
function isSolanaKey(publicKey: string): boolean {
  const solanaRegex = /^[A-HJ-NP-Za-km-z1-9]{32,44}$/;
  return solanaRegex.test(publicKey);
}

/**
 * Checks if the given public key matches Cardano's format.
 * @param publicKey The public key to check.
 * @returns True if it's a valid Cardano public key.
 */
function isCardanoKey(publicKey: string): boolean {
  // Cardano addresses can start with 'addr1' (for Shelley-style addresses) and are 58-104 characters long.
  return (
    publicKey.startsWith("addr1") &&
    publicKey.length >= 58 &&
    publicKey.length <= 104
  );
}

/**
 * Checks if the given public key matches Polkadot's format.
 * @param publicKey The public key to check.
 * @returns True if it's a valid Polkadot public key.
 */
function isPolkadotKey(publicKey: string): boolean {
  // Polkadot public keys are Base58 encoded and are 48 characters long.
  const polkadotRegex = /^[1-9A-HJ-NP-Za-km-z]{48}$/;
  return polkadotRegex.test(publicKey);
}

export { getBlockChainByPublicKey };
