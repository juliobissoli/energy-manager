import { FastifyInstance } from "fastify";
import { InvoiceCreate, InvoiceFilterParams } from "../interfaces/invoices.interface";
import InvoiceController from "../controller/invoice.controller";


export async function invoiceRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: InvoiceCreate }>('/', async (req, reply) => {
        const invoiceController = new InvoiceController();
        try {

            const invoice = await invoiceController.create(req.body);

            reply.status(201).send(invoice);
        } catch (error) {
            reply.send(error);
        }
    });


    fastify.get('/', async (req, reply) => {
        const invoiceController = new InvoiceController();
        try {
            const filterParams: InvoiceFilterParams | undefined = req.query.installation_id ?
                { installationId: req.query.installation_id as string }
                : undefined;
            const invoices = await invoiceController.findAll(filterParams);
            reply.send(invoices);
        } catch (error) {
            reply.send(error);
        }
    });


    fastify.post<{ Body: { installationId: string, invoices: InvoiceCreate[] } }>('/create-many', async (req, reply) => {
        const invoiceController = new InvoiceController();
        try {
            const invoices = await invoiceController.createMany(req.body.installationId, req.body.invoices);
            reply.send(invoices);
        } catch (error) {
            reply.send(error);
        }
    });


    fastify.get<{ Params: { invoiceId: string } }>('/:invoiceId/download', async (req, reply) => {
        const invoiceController = new InvoiceController();
        try {
            console.log('req.params.invoiceId ====================> ', req.params.invoiceId);
            const pdfBuffer = await invoiceController.downloadInvoicePdf(req.params.invoiceId);
            reply.header('Content-Type', 'application/pdf');
            reply.header('Content-Disposition', `attachment; filename=invoice-${req.params.invoiceId}.pdf`);
            reply.send(pdfBuffer);
        } catch (error) {
            reply.status(404).send({ message: (error as Error).message });
        }
    });
}

