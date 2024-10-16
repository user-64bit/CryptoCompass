/*
  Warnings:

  - You are about to drop the column `balance` on the `PublicKey` table. All the data in the column will be lost.
  - Added the required column `balanceCrypto` to the `PublicKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cryptoToUSD` to the `PublicKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PublicKey" DROP COLUMN "balance",
ADD COLUMN     "balanceCrypto" TEXT NOT NULL,
ADD COLUMN     "cryptoToUSD" TEXT NOT NULL;
