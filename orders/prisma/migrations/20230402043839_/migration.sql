-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "title" VARCHAR(500),
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
