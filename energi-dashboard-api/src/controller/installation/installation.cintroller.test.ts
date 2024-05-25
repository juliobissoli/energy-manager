import { InstallationModel } from '../../model/insttalation.model';
import { InstallationCreate } from '../../interfaces/installation.interface';
import InstallationController from './installation.cintroller';

describe('InstallationController', () => {
    let installationController: InstallationController;
    let mockInstallationModel: Partial<InstallationModel>;

    

    beforeEach(() => {
        mockInstallationModel = {
            create: jest.fn().mockResolvedValue({
                id: '1',
                clientName: 'Cliente Teste',
                number: '12345',
                clientNumber: '67890'
            }),
            findByInstallationNumber: jest.fn().mockResolvedValue(null)
        };

        installationController = new InstallationController();
        installationController.installationRepository = mockInstallationModel as InstallationModel;

    });

    describe('create', () => {
        it('deve criar uma nova instalação se não existir uma com o mesmo número', async () => {
            const installationData: InstallationCreate = {
                clientName: 'Cliente Teste',
                number: '12345',
                clientNumber: '67890'
            };

            const result = await installationController.create(installationData);

            expect(mockInstallationModel.create).toHaveBeenCalledWith(installationData);
            expect(result).toEqual({
                id: '1',
                clientName: 'Cliente Teste',
                number: '12345',
                clientNumber: '67890'
            });
        });

        it('deve lançar um erro se já existir uma instalação com o mesmo número', async () => {
            mockInstallationModel.findByInstallationNumber = jest.fn().mockResolvedValue({
                id: '1',
                clientName: 'Cliente Teste',
                number: '12345',
                clientNumber: '67890'
            });

            const installationData: InstallationCreate = {
                clientName: 'Cliente Teste',
                number: '12345',
                clientNumber: '67890'
            };

            await expect(installationController.create(installationData)).rejects.toThrow('Installation already exists');
        });
    });
});
