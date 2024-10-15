/*
  Warnings:

  - Added the required column `balance` to the `PublicKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PublicKey" ADD COLUMN     "balance" TEXT NOT NULL;
