/*
  Warnings:

  - You are about to drop the column `public_key_id` on the `Group` table. All the data in the column will be lost.
  - Added the required column `public_keys` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "public_key_id",
ADD COLUMN     "public_keys" TEXT NOT NULL;
