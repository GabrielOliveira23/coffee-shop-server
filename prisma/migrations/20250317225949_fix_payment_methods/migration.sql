/*
  Warnings:

  - The values [PIX] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'MONEY');
ALTER TABLE "orders" ALTER COLUMN "paymentBy" TYPE "PaymentMethod_new" USING ("paymentBy"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;
