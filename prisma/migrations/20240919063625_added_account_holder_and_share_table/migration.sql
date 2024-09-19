/*
  Warnings:

  - You are about to drop the column `account_holder_name` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `boid` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Share` table. All the data in the column will be lost.
  - Added the required column `accountHolderId` to the `Share` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_userId_fkey";

-- DropIndex
DROP INDEX "Share_boid_key";

-- DropIndex
DROP INDEX "Share_id_key";

-- AlterTable
ALTER TABLE "Share" DROP COLUMN "account_holder_name",
DROP COLUMN "boid",
DROP COLUMN "userId",
ADD COLUMN     "accountHolderId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "AccountHolder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "account_holder_name" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT 'dipakgiri.dev@gmail.com',
    "phone_number" TEXT NOT NULL DEFAULT '9865506700',
    "boid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AccountHolder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountHolder_email_key" ON "AccountHolder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountHolder_boid_key" ON "AccountHolder"("boid");

-- AddForeignKey
ALTER TABLE "AccountHolder" ADD CONSTRAINT "AccountHolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_accountHolderId_fkey" FOREIGN KEY ("accountHolderId") REFERENCES "AccountHolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
