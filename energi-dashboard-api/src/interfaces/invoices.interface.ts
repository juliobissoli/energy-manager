export interface Invoice {
    id: string;
    installationId: string;
    installNumber: string;
    date: Date;
    consumeAmountInKwh: number;
    consumeUnitValue: number;
    consumeTotalValue: number;
    invoiceDateRef: string;
    dateRef: Date;
    invoiceDueDate: string;
    dueDate: Date;
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

export interface InvoiceCreate {
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
}

export interface InvoiceFilterParams {
    installationId?: string;
    dateIni?: string;
    dateEnd?: string;
}

export interface InvoiceRepository {
    create(invoice: InvoiceCreate): Promise<Invoice>;
    createMany(invoices: InvoiceCreate[]): Promise<String>;
    findAll(filterParams?: InvoiceFilterParams): Promise<Invoice[]>;
    findById(invoiceId: string): Promise<Invoice | null>;
    // findByClientNumber(clientNumber: number): Promise<Invoice | null>;
}

