-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "imagePublicId" TEXT;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "image" TEXT,
ADD COLUMN     "imagePublicId" TEXT;
