import { InvoiceCreate } from "../../interfaces/invoices.interface";
import { InstallationModel } from "../../model/insttalation.model";
import { InvoiceModel } from "../../model/invoice.model";
import InvoiceController from "./invoice.controller";

describe('InvoiceController', () => {
    let invoiceController: InvoiceController;
    let mockInvoiceModel: Partial<InvoiceModel>;
    let mockInstallationModel: Partial<InstallationModel>

    beforeEach(() => {
        mockInvoiceModel = {
            create: jest.fn().mockResolvedValue({
                id: '1',
                installNumber: '12345',
                installationId: '1',
                date: new Date().toDateString(),
                consumeAmountInKwh: 100,
                consumeUnitValue: 0.5,
                consumeTotalValue: 50,
                dateRef: new Date('2023-01-01').toDateString(),
                invoiceDateRef: 'AGO/2023',
                dueDate: new Date('2023-09-12').toDateString(),
                invoiceDueDate: '12/09/2023',
                invoiceValue: 60,
                publicTaxValue: 10,
                fullConsumedEnergy: 100,
                compensatedEnergy: 50,
                economyGD: 5,
                valueWithoutGD: 55,
                energyCompensated: 45
            }),
        };

        mockInstallationModel = {
            findById: jest.fn().mockResolvedValue(null)
        }

        invoiceController = new InvoiceController();
        invoiceController.invoiceRepository = mockInvoiceModel as InvoiceModel;
        invoiceController.installationRepository = mockInstallationModel as InstallationModel


    });

    describe('create', () => {
        it('deve criar uma nova fatura', async () => {

            mockInstallationModel.findById = jest.fn().mockResolvedValue({
                id: '1',
                clientName: 'Client 1',
                number: '123'
            });

            const invoiceData: InvoiceCreate = {
                installNumber: '12345',
                installationId: '1',
                consumeAmountInKwh: 100,
                consumeUnitValue: 0.5,
                consumeTotalValue: 50,
                invoiceDateRef: "AGO/2023",
                invoiceDueDate: "12/09/2023",
                invoiceValue: 60,
                publicTaxValue: 10,
                fullConsumedEnergy: 100,
                compensatedEnergy: 50,
                economyGD: 5,
                valueWithoutGD: 55,
                energyCompensated: 45
            };

            const result = await invoiceController.create(invoiceData);
            expect(mockInvoiceModel.create).toHaveBeenCalledWith(invoiceData);
            expect(result).toEqual({
                id: '1',
                installNumber: '12345',
                installationId: '1',
                date: new Date().toDateString(),
                consumeAmountInKwh: 100,
                consumeUnitValue: 0.5,
                consumeTotalValue: 50,
                dateRef: new Date('2023-01-01').toDateString(),
                invoiceDateRef: 'AGO/2023',
                dueDate: new Date('2023-09-12').toDateString(),
                invoiceDueDate: '12/09/2023',
                invoiceValue: 60,
                publicTaxValue: 10,
                fullConsumedEnergy: 100,
                compensatedEnergy: 50,
                economyGD: 5,
                valueWithoutGD: 55,
                energyCompensated: 45
            });
        });

        it('deve lançar um erro se nao existir installacao com o id passado', async () => {

            mockInstallationModel.findById = jest.fn().mockResolvedValue(null);


            const invoiceData: InvoiceCreate = {
                installNumber: '12345',
                installationId: '1',
                consumeAmountInKwh: 100,
                consumeUnitValue: 0.5,
                consumeTotalValue: 50,
                invoiceDateRef: '01/2023',
                invoiceDueDate: '01/01/2023',
                invoiceValue: 60,
                publicTaxValue: 10,
                fullConsumedEnergy: 100,
                compensatedEnergy: 50,
                economyGD: 5,
                valueWithoutGD: 55,
                energyCompensated: 45
            };

            await expect(invoiceController.create(invoiceData)).rejects.toThrow('Installation not found');
        });

        it('deve retornar todas as faturas existentes', async () => {
            const mockInvoices = [
                {
                    id: '1',
                    installNumber: '12345',
                    date: new Date(),
                    consumeAmountInKwh: 100,
                    consumeUnitValue: 0.5,
                    consumeTotalValue: 50,
                    invoiceDateRef: '01/2023',
                    dateRef: new Date(),
                    invoiceDueDate: '01/01/2023',
                    dueDate: new Date(),
                    invoiceValue: 60,
                    publicTaxValue: 10,
                    fullConsumedEnergy: 100,
                    compensatedEnergy: 50,
                    economyGD: 5,
                    valueWithoutGD: 55,
                    energyCompensated: 45
                },
                {
                    id: '2',
                    installNumber: '54321',
                    date: new Date(),
                    consumeAmountInKwh: 200,
                    consumeUnitValue: 0.6,
                    consumeTotalValue: 120,
                    invoiceDateRef: '02/2023',
                    dateRef: new Date(),
                    invoiceDueDate: '02/01/2023',
                    dueDate: new Date(),
                    invoiceValue: 130,
                    publicTaxValue: 20,
                    fullConsumedEnergy: 200,
                    compensatedEnergy: 100,
                    economyGD: 10,
                    valueWithoutGD: 120,
                    energyCompensated: 80
                }
            ];

            mockInvoiceModel.findAll = jest.fn().mockResolvedValue(mockInvoices);

            const result = await invoiceController.findAll();

            expect(mockInvoiceModel.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockInvoices);
        });

    it('deve retornar todas as faturas existentes filtrando por installationId', async () => {
        const mockInvoices = [
            {
                id: '1',
                installNumber: '12345',
                date: new Date(),
                consumeAmountInKwh: 100,
                consumeUnitValue: 0.5,
                consumeTotalValue: 50,
                invoiceDateRef: '01/2023',
                dateRef: new Date(),
                invoiceDueDate: '01/01/2023',
                dueDate: new Date(),
                invoiceValue: 60,
                publicTaxValue: 10,
                fullConsumedEnergy: 100,
                compensatedEnergy: 50,
                economyGD: 5,
                valueWithoutGD: 55,
                energyCompensated: 45
            },
            {
                id: '2',
                installNumber: '54321',
                date: new Date(),
                consumeAmountInKwh: 200,
                consumeUnitValue: 0.6,
                consumeTotalValue: 120,
                invoiceDateRef: '02/2023',
                dateRef: new Date(),
                invoiceDueDate: '02/01/2023',
                dueDate: new Date(),
                invoiceValue: 130,
                publicTaxValue: 20,
                fullConsumedEnergy: 200,
                compensatedEnergy: 100,
                economyGD: 10,
                valueWithoutGD: 120,
                energyCompensated: 80
            }
        ];

        mockInvoiceModel.findAll = jest.fn().mockResolvedValue(mockInvoices);

        const result = await invoiceController.findAll({ installationId: '123' });

        expect(mockInvoiceModel.findAll).toHaveBeenCalledWith({ installationId: '123' });
        expect(result).toEqual(mockInvoices);
    });

    it('deve retornar todas as faturas existentes filtrando por dateInit e dateEnd', async () => {
        const mockInvoices = [
            {
                id: '1',
                installNumber: '12345',
                date: new Date(),
                consumeAmountInKwh: 100,
                consumeUnitValue: 0.5,
                consumeTotalValue: 50,
                invoiceDateRef: '01/2023',
                dateRef: new Date(),
                invoiceDueDate: '01/01/2023',
                dueDate: new Date(),
                invoiceValue: 60,
                publicTaxValue: 10,
                fullConsumedEnergy: 100,
                compensatedEnergy: 50,
                economyGD: 5,
                valueWithoutGD: 55,
                energyCompensated: 45
            },
            {
                id: '2',
                installNumber: '54321',
                date: new Date(),
                consumeAmountInKwh: 200,
                consumeUnitValue: 0.6,
                consumeTotalValue: 120,
                invoiceDateRef: '02/2023',
                dateRef: new Date(),
                invoiceDueDate: '02/01/2023',
                dueDate: new Date(),
                invoiceValue: 130,
                publicTaxValue: 20,
                fullConsumedEnergy: 200,
                compensatedEnergy: 100,
                economyGD: 10,
                valueWithoutGD: 120,
                energyCompensated: 80
            }
        ];

        mockInvoiceModel.findAll = jest.fn().mockResolvedValue(mockInvoices);

        const result = await invoiceController.findAll({ dateInit: '01/01/2023', dateEnd: '02/01/2023' });

        expect(mockInvoiceModel.findAll).toHaveBeenCalledWith({ dateInit: '01/01/2023', dateEnd: '02/01/2023' });
        expect(result).toEqual(mockInvoices);
    });
    });
});
