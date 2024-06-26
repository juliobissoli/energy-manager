import { prisma } from "../database/prisma-client";
import { Invoice, InvoiceCreate, InvoiceFilterParams, InvoiceRepository } from "../interfaces/invoices.interface";
import { convertDateRef2SDate, convertDueDate } from "../utils/date-converter";

class InvoiceModel implements InvoiceRepository {

    private mountInvoice(invoice: InvoiceCreate): any {
        const data = {
            installationId: invoice.installationId,
            installNumber: invoice.installNumber,
            consumeAmountInKwh: invoice.consumeAmountInKwh,
            consumeUnitValue: invoice.consumeUnitValue,
            consumeTotalValue: invoice.consumeTotalValue,
            invoiceDateRef: invoice.invoiceDateRef,
            invoiceDueDate: invoice.invoiceDueDate,
            invoiceValue: invoice.invoiceValue,
            publicTaxValue: invoice.publicTaxValue,
            fullConsumedEnergy: invoice.fullConsumedEnergy,
            compensatedEnergy: invoice.compensatedEnergy,
            economyGD: invoice.economyGD,
            valueWithoutGD: invoice.valueWithoutGD,
            energyCompensated: invoice.energyCompensated,
            date: new Date(),
            dateRef: convertDateRef2SDate(invoice.invoiceDateRef),
            dueDate: convertDueDate(invoice.invoiceDueDate),
        }

        return data;
    }

    async create(invoice: InvoiceCreate): Promise<Invoice> {
        const data = this.mountInvoice(invoice);
        const invoiceCreated = await prisma.invoice.create({ data });
        return invoiceCreated;
    }


    async findAll(filterParams?: InvoiceFilterParams): Promise<Invoice[]> {
        const where: any = {}

        if (filterParams) {
            if (filterParams?.installationId) where.installationId = filterParams.installationId
            if (filterParams?.dateInit && !isNaN(new Date(filterParams.dateInit).getTime())) {
                where.dateRef = { gte: new Date(filterParams.dateInit) }
            }
            if (filterParams?.dateEnd && !isNaN(new Date(filterParams.dateEnd).getTime())) {
                where.dateRef = { ...where.dateRef, lte: new Date(filterParams.dateEnd) }
            }
            // if (filterParams?.dateInit && filterParams?.dateEnd && !isNaN(new Date(filterParams.dateInit).getTime())
            //     && !isNaN(new Date(filterParams.dateEnd).getTime())) {
            //     where.dateRef = {
            //         gte: new Date(filterParams.dateInit),
            //         lte: new Date(filterParams.dateEnd)
            //     }
            // }

        }

        const invoices = await prisma.invoice.findMany(
            { where }
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
            const data = invoices.map(this.mountInvoice);
            const invoicesCreated = await prisma.invoice.createMany({
                data,
            });
            return invoicesCreated ? 'Invoices created' : 'Error';
        } catch (error) {
            return 'Error';
        }
    }

}

export { InvoiceModel }

