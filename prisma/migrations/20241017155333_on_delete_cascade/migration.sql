-- DropForeignKey
ALTER TABLE "PublicKey" DROP CONSTRAINT "PublicKey_groupId_fkey";

-- AddForeignKey
ALTER TABLE "PublicKey" ADD CONSTRAINT "PublicKey_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
