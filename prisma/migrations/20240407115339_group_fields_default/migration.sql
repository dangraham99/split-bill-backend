-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled group',
ALTER COLUMN "balanceInCents" SET DEFAULT 0;
