import { Installation, Invoice } from "@prisma/client";
import { InstallationCreate, InstallationRepository } from "../interfaces/installation.interface";
import { InstallationModel } from "../model/insttalation.model";

class InstallationController {
    private installationRepository: InstallationRepository;
    constructor() {
        this.installationRepository = new InstallationModel();
    }


    async create({ clientName, number, clientNumber }: InstallationCreate): Promise<Installation> {

        const verifyInstallation = await this.findByInstallationNumber(number);
        if (verifyInstallation) {
            throw new Error('Installation already exists');
        }

        const client = await this.installationRepository.create({ clientName, number, clientNumber });
        return client;
    }

    async findByInstallationNumber(installationNumber: string): Promise<Installation | null> {
        const installation = await this.installationRepository.findByInstallationNumber(installationNumber);
        return installation;
    }

    async findById(id: string): Promise<Installation | null> {
        const installation = await this.installationRepository.findById(id);
        return installation;
    }

    async findAll(): Promise<Installation[]> {
        const clients = await this.installationRepository.findAll();
        return clients;
    }
}


export default InstallationController;

