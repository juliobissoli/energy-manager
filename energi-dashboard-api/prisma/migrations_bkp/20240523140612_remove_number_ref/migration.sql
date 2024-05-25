-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "installationId" TEXT NOT NULL,
    "installNumber" TEXT NOT NULL,
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
INSERT INTO "new_invoices" ("consumeAmountInKwh", "consumeTotalValue", "consumeUnitValue", "createdAt", "id", "installNumber", "installationId", "invoiceDateRef", "invoiceDueDate", "invoiceValue", "publicTaxValue", "updatedAt") SELECT "consumeAmountInKwh", "consumeTotalValue", "consumeUnitValue", "createdAt", "id", "installNumber", "installationId", "invoiceDateRef", "invoiceDueDate", "invoiceValue", "publicTaxValue", "updatedAt" FROM "invoices";
DROP TABLE "invoices";
ALTER TABLE "new_invoices" RENAME TO "invoices";
PRAGMA foreign_key_check("invoices");
PRAGMA foreign_keys=ON;
