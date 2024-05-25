/*
  Warnings:

  - You are about to drop the column `instalationNumber` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `invoices` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "clientNumber" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_clients" ("clientNumber", "createdAt", "id", "name", "updatedAt") SELECT "clientNumber", "createdAt", "id", "name", "updatedAt" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_clientNumber_key" ON "clients"("clientNumber");
CREATE TABLE "new_invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "consumeAmountInKwh" INTEGER NOT NULL,
    "consumeUnitValue" INTEGER NOT NULL,
    "consumeTotalValue" INTEGER NOT NULL,
    "invoiceDateRef" TEXT NOT NULL,
    "invoiceDueDate" TEXT NOT NULL,
    "invoiceValue" INTEGER NOT NULL,
    "publicTaxValue" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_invoices" ("clientId", "consumeAmountInKwh", "consumeTotalValue", "consumeUnitValue", "createdAt", "id", "invoiceDateRef", "invoiceDueDate", "invoiceValue", "publicTaxValue", "updatedAt") SELECT "clientId", "consumeAmountInKwh", "consumeTotalValue", "consumeUnitValue", "createdAt", "id", "invoiceDateRef", "invoiceDueDate", "invoiceValue", "publicTaxValue", "updatedAt" FROM "invoices";
DROP TABLE "invoices";
ALTER TABLE "new_invoices" RENAME TO "invoices";
PRAGMA foreign_key_check("clients");
PRAGMA foreign_key_check("invoices");
PRAGMA foreign_keys=ON;
