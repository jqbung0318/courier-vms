/*
  Warnings:

  - The values [CARS] on the enum `VehicleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VehicleType_new" AS ENUM ('MOTORCYCLE', 'CAR', 'FOURWHEELS', 'VAN', 'LORRY');
ALTER TABLE "Vehicle" ALTER COLUMN "type" TYPE "VehicleType_new" USING ("type"::text::"VehicleType_new");
ALTER TYPE "VehicleType" RENAME TO "VehicleType_old";
ALTER TYPE "VehicleType_new" RENAME TO "VehicleType";
DROP TYPE "VehicleType_old";
COMMIT;
