/*
  Warnings:

  - Made the column `nickName` on table `PublicKey` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PublicKey" ALTER COLUMN "nickName" SET NOT NULL;
