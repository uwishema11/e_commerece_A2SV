/*
  Warnings:

  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_status_isVerified_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified";

-- DropEnum
DROP TYPE "VerificationStatus";

-- CreateIndex
CREATE INDEX "User_status_role_idx" ON "User"("status", "role");
