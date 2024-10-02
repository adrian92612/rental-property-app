/*
  Warnings:

  - Made the column `userId` on table `Tenant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_userId_fkey";

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
