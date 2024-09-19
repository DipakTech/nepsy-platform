/*
  Warnings:

  - You are about to drop the column `email` on the `AccountHolder` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `AccountHolder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_name,accountHolderId]` on the table `Share` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AccountHolder_email_key";

-- AlterTable
ALTER TABLE "AccountHolder" DROP COLUMN "email",
DROP COLUMN "phone_number";

-- CreateIndex
CREATE UNIQUE INDEX "Share_company_name_accountHolderId_key" ON "Share"("company_name", "accountHolderId");
