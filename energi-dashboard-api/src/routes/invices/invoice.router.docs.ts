export const createInvoiceDocs = {
    schema: {
        description: 'Create invoice',
        tags: ['invoice'],
        params: {
            type: 'object',
            properties: {
                installationId: { type: 'string' },
                installNumber: { type: 'string' },
                consumeAmountInKwh: { type: 'number' },
                consumeUnitValue: { type: 'number' },
                consumeTotalValue: { type: 'number' },
                invoiceDateRef: { type: 'string' },
                invoiceDueDate: { type: 'string' },
                invoiceValue: { type: 'number' },
                publicTaxValue: { type: 'number' },
                fullConsumedEnergy: { type: 'number' },
                compensatedEnergy: { type: 'number' },
                economyGD: { type: 'number' },
                valueWithoutGD: { type: 'number' },
                energyCompensated: { type: 'number' },
            },
            required: ['installationId']
        }
    }
};

export const createManyInvoicesDocs = {
    schema: {
        description: 'Create multiple invoices',
        tags: ['invoice'],
        body: {
            type: 'object',
            properties: {
                installationId: { type: 'string' },
                invoices: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            installNumber: { type: 'string' },
                            consumeAmountInKwh: { type: 'number' },
                            consumeUnitValue: { type: 'number' },
                            consumeTotalValue: { type: 'number' },
                            invoiceDateRef: { type: 'string' },
                            invoiceDueDate: { type: 'string' },
                            invoiceValue: { type: 'number' },
                            publicTaxValue: { type: 'number' },
                            fullConsumedEnergy: { type: 'number' },
                            compensatedEnergy: { type: 'number' },
                            economyGD: { type: 'number' },
                            valueWithoutGD: { type: 'number' },
                            energyCompensated: { type: 'number' },
                        },
                    }
                }
            },
            required: ['installationId', 'invoices']
        }
    }
};

export const downloadInvoiceDocs = {
    schema: {
        description: 'Download invoice PDF',
        tags: ['invoice'],
        params: {
            type: 'object',
            properties: {
                invoiceId: { type: 'string' }
            },
            required: ['invoiceId']
        }
    }
};