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

export interface InvoiceCreate {
    installationId: string;
    installNumber: number;
    consumeAmountInKwh: number;
    consumeUnitValue: number;
    consumeTotalValue: number;
    invoiceDateRef: string;
    invoiceDueDate: string;
    invoiceValue: number;
    publicTaxValue: number;
}

export interface InvoiceFilterParams {
    installationId: string;
}

export interface InvoiceRepository {
    create(invoice: InvoiceCreate): Promise<Invoice>;
    createMany(invoices: InvoiceCreate[]): Promise<String>;
    findAll(filterParams?: InvoiceFilterParams): Promise<Invoice[]>;
    findById(invoiceId: string): Promise<Invoice | null>;
    // findByClientNumber(clientNumber: number): Promise<Invoice | null>;
}
