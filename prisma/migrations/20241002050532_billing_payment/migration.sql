-- AlterTable
ALTER TABLE "User" ADD COLUMN     "billingAddress" TEXT,
ADD COLUMN     "paymentMethod" TEXT NOT NULL DEFAULT 'card',
ADD COLUMN     "subscription" TEXT NOT NULL DEFAULT 'monthly';
