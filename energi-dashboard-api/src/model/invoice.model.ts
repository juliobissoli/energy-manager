import { prisma } from "../database/prisma-client";
import { Invoice, InvoiceCreate, InvoiceFilterParams, InvoiceRepository } from "../interfaces/invoices.interface";

class InvoiceModel implements InvoiceRepository {
    async create(invoice: InvoiceCreate): Promise<Invoice> {
        const invoiceCreated = await prisma.invoice.create({
            data: { ...invoice }
        });
        return invoiceCreated;
    }


    async findAll(filterParams?: InvoiceFilterParams): Promise<Invoice[]> {
        const where = filterParams ? {
            installationId: filterParams.installationId
        } : undefined;
        const invoices = await prisma.invoice.findMany(
            {
                where
            }
        );
        return invoices;
    }

    async findById(invoiceId: string): Promise<Invoice | null> {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: invoiceId
            }
        });
        return invoice;
    }

    async createMany(invoices: InvoiceCreate[]): Promise<String> {
        try {
            const invoicesCreated = await prisma.invoice.createMany({
                data: invoices,
            });
            return invoicesCreated ? 'Invoices created' : 'Error';
        } catch (error) {
            console.log('============= Erro ao criar faturas ============= \n\n', error);
            return 'Error';
        }
    }

}

export { InvoiceModel }

