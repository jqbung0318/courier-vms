/*
  Warnings:

  - You are about to drop the column `online` on the `Vehicle` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ONLINE', 'OFFLINE', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "online",
ADD COLUMN     "status" "VehicleStatus" NOT NULL DEFAULT 'ONLINE';
