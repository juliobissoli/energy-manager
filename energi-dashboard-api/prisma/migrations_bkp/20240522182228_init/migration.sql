-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "instalationNumber" INTEGER NOT NULL,
    "clientNumber" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "consumeAmountInKwh" INTEGER NOT NULL,
    "consumeUnitValue" INTEGER NOT NULL,
    "consumeTotalValue" INTEGER NOT NULL,
    "invoiceDateRef" TEXT NOT NULL,
    "invoiceDueDate" TEXT NOT NULL,
    "invoiceValue" INTEGER NOT NULL,
    "publicTaxValue" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_instalationNumber_key" ON "clients"("instalationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "clients_clientNumber_key" ON "clients"("clientNumber");
