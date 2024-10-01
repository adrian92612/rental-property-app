-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notifyEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyOffers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyPush" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyReminders" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifySms" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyUpdates" BOOLEAN NOT NULL DEFAULT false;
