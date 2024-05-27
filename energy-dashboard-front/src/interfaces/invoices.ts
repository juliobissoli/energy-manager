export interface Invoice {
    id: string;
    installationId: string;
    installNumber: string;
    consumeAmountInKwh: number;
    consumeUnitValue: number;
    consumeTotalValue: number;
    invoiceDateRef: string;
    invoiceDueDate: string;
    invoiceValue: number;
    publicTaxValue: number;
    fullConsumedEnergy: number;
    compensatedEnergy: number;
    economyGD: number;
    valueWithoutGD: number;
    energyCompensated: number;
    createdAt: Date;
    updatedAt: Date;
}