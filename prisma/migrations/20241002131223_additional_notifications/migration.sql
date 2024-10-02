-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notifyAlerts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyEvents" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyReports" BOOLEAN NOT NULL DEFAULT false;
