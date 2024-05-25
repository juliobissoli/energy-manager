-- CreateTable
CREATE TABLE "installations" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "installations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "installationId" TEXT NOT NULL,
    "installNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "consumeAmountInKwh" DOUBLE PRECISION NOT NULL,
    "consumeUnitValue" DOUBLE PRECISION NOT NULL,
    "consumeTotalValue" DOUBLE PRECISION NOT NULL,
    "invoiceDateRef" TEXT NOT NULL,
    "dateRef" TIMESTAMP(3) NOT NULL,
    "invoiceDueDate" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "invoiceValue" DOUBLE PRECISION NOT NULL,
    "publicTaxValue" DOUBLE PRECISION NOT NULL,
    "fullConsumedEnergy" DOUBLE PRECISION NOT NULL,
    "compensatedEnergy" DOUBLE PRECISION NOT NULL,
    "economyGD" DOUBLE PRECISION NOT NULL,
    "valueWithoutGD" DOUBLE PRECISION NOT NULL,
    "energyCompensated" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "installations_number_key" ON "installations"("number");

-- CreateIndex
CREATE UNIQUE INDEX "installations_clientNumber_key" ON "installations"("clientNumber");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "installations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
