export interface Invoice {
    id: string;
    installationId: string;
    installNumber: number;
    consumeAmountInKwh: number;
    consumeUnitValue: number;
    consumeTotalValue: number;
    invoiceDateRef: string;
    invoiceDueDate: string;
    invoiceValue: number;
    publicTaxValue: number;
    createdAt: Date;
    updatedAt: Date;
}