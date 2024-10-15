/*
  Warnings:

  - You are about to drop the column `publicKey` on the `Group` table. All the data in the column will be lost.
  - Added the required column `public_key_id` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_userId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "publicKey",
ADD COLUMN     "public_key_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
