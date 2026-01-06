/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."transactions" ADD COLUMN     "transactionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transactionId_key" ON "public"."transactions"("transactionId");
