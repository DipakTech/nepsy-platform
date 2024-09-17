/*
  Warnings:

  - A unique constraint covering the columns `[boid]` on the table `Share` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kitta` to the `Share` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "kitta" INTEGER NOT NULL,
ALTER COLUMN "boid" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Share_boid_key" ON "Share"("boid");
