/*
  Warnings:

  - Made the column `password` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "password" SET NOT NULL;
