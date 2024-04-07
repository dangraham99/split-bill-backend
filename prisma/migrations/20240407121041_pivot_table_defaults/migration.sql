/*
  Warnings:

  - You are about to drop the column `userId` on the `Groups` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Groups_userId_key";

-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "UsersInGroup" ALTER COLUMN "userBalanceInCents" SET DEFAULT 0;
