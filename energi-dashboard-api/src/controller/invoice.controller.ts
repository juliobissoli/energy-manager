import { Invoice } from "@prisma/client";
import { InvoiceCreate, InvoiceFilterParams, InvoiceRepository } from "../interfaces/invoices.interface";
import { InvoiceModel } from "../model/invoice.model";
import { createReadStream } from 'fs';
import { join } from 'path';
import { InstallationModel } from "../model/insttalation.model";
import { convertDateRef2SDate } from "../utils/date-converter";
import moment from "moment";


class InvoiceController {
    private invoiceRepository: InvoiceRepository;
    private installationRepository: InstallationModel;
    constructor() {
        this.invoiceRepository = new InvoiceModel();
        this.installationRepository = new InstallationModel();
    }


    async create(data: InvoiceCreate): Promise<Invoice> {

        const verifyInstallation = await this.installationRepository.findById(data.installationId);
        if (!verifyInstallation) {
            throw new Error('Installation not found');
        }

        const invoice = await this.invoiceRepository.create(data);
        return invoice;
    }


    async findAll(filterParams?: InvoiceFilterParams): Promise<Invoice[]> {
        const invoices = await this.invoiceRepository.findAll(filterParams);
        return invoices;
    }





    async createMany(installationId: string, invoices: InvoiceCreate[]): Promise<String> {

        const verifyInstallation = await this.installationRepository.findById(installationId);
        if (!verifyInstallation) {
            throw new Error('Installation not found');
        }

        const invoicesCreated = await this.invoiceRepository.createMany(
            invoices.map(invoice => ({ ...invoice, installationId: installationId }))
        );
        return invoicesCreated;
    }


    async downloadInvoicePdf(invoiceId: string): Promise<Buffer> {
        const invoice = await this.invoiceRepository.findById(invoiceId);
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        console.log('invoice.invoiceDateRef', invoice.invoiceDateRef)
        const dateRef = convertDateRef2SDate(invoice.invoiceDateRef);
        console.log(dateRef)

        const filePath = join(__dirname, '../../invoices', `${invoice.installNumber}-${moment(dateRef).format('MM-YYYY')}.pdf`);

        console.log('filePath =+=>>> ', filePath);
        const stream = createReadStream(filePath);
        const chunks: Buffer[] = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }
}


export default InvoiceController;
