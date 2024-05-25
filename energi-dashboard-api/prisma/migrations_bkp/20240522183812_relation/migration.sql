/*
  Warnings:

  - Added the required column `clientId` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
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
INSERT INTO "new_invoices" ("consumeAmountInKwh", "consumeTotalValue", "consumeUnitValue", "createdAt", "date", "id", "invoiceDateRef", "invoiceDueDate", "invoiceValue", "name", "publicTaxValue", "updatedAt") SELECT "consumeAmountInKwh", "consumeTotalValue", "consumeUnitValue", "createdAt", "date", "id", "invoiceDateRef", "invoiceDueDate", "invoiceValue", "name", "publicTaxValue", "updatedAt" FROM "invoices";
DROP TABLE "invoices";
ALTER TABLE "new_invoices" RENAME TO "invoices";
PRAGMA foreign_key_check("invoices");
PRAGMA foreign_keys=ON;
