/*
  Warnings:

  - Added the required column `blockchain` to the `PublicKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PublicKey" ADD COLUMN     "blockchain" TEXT NOT NULL;
