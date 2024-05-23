/*
  Warnings:

  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `clientId` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `installNumber` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installationId` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clients_clientNumber_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "clients";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "installations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "installationId" TEXT NOT NULL,
    "installNumber" INTEGER NOT NULL,
    "consumeAmountInKwh" INTEGER NOT NULL,
    "consumeUnitValue" INTEGER NOT NULL,
    "consumeTotalValue" INTEGER NOT NULL,
    "invoiceDateRef" TEXT NOT NULL,
    "invoiceDueDate" TEXT NOT NULL,
    "invoiceValue" INTEGER NOT NULL,
    "publicTaxValue" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "invoices_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "installations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_invoices" ("consumeAmountInKwh", "consumeTotalValue", "consumeUnitValue", "createdAt", "id", "invoiceDateRef", "invoiceDueDate", "invoiceValue", "publicTaxValue", "updatedAt") SELECT "consumeAmountInKwh", "consumeTotalValue", "consumeUnitValue", "createdAt", "id", "invoiceDateRef", "invoiceDueDate", "invoiceValue", "publicTaxValue", "updatedAt" FROM "invoices";
DROP TABLE "invoices";
ALTER TABLE "new_invoices" RENAME TO "invoices";
PRAGMA foreign_key_check("invoices");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "installations_number_key" ON "installations"("number");

-- CreateIndex
CREATE UNIQUE INDEX "installations_clientNumber_key" ON "installations"("clientNumber");
