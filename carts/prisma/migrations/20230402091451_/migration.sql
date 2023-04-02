/*
  Warnings:

  - You are about to drop the column `customerId` on the `CartItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CartItem_customerId_key";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "customerId",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_productId_key" ON "CartItem"("productId");
