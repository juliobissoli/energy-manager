import { FastifyInstance } from "fastify";
import { InvoiceCreate, InvoiceFilterParams } from "../interfaces/invoices.interface";
import InvoiceController from "../controller/invoice/invoice.controller";


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


    fastify.get<{ Querystring: InvoiceFilterParams }>('/', async (req, reply) => {
        const invoiceController = new InvoiceController();
        try {
            // const filterParams: InvoiceFilterParams | undefined = req.query.installationId ?
            //     { installationId: req.query.installationId as string }
            //     : undefined;
            console.log('===> ', req.query);
            const invoices = await invoiceController.findAll(req.query);
            reply.send(invoices);
        } catch (error) {
            reply.send(error);
        }
    });


    fastify.post<{ Body: { installationId: string, invoices: InvoiceCreate[] } }>('/create-many', async (req, reply) => {
        const { installationId, invoices } = req.body;
        if (!installationId || !invoices || invoices.length === 0) {
            reply.status(400).send({ error: "Parâmetros 'installationId' e 'invoices' são necessários e 'invoices' não pode ser vazio." });
            return;
        }
        const invoiceController = new InvoiceController();
        try {
            const invoicesRes = await invoiceController.createMany(installationId, invoices);
            reply.send(invoicesRes);
        } catch (error) {
            reply.send(error);
        }
    });


    fastify.get<{ Params: { invoiceId: string } }>('/:invoiceId/download', async (req, reply) => {
        const invoiceController = new InvoiceController();
        try {
            const pdfBuffer = await invoiceController.downloadInvoicePdf(req.params.invoiceId);
            reply.header('Content-Type', 'application/pdf');
            reply.header('Content-Disposition', `attachment; filename=invoice-${req.params.invoiceId}.pdf`);
            reply.send(pdfBuffer);
        } catch (error) {
            reply.status(404).send({ message: (error as Error).message });
        }
    });
}

