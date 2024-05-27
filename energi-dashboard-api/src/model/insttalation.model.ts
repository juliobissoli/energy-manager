import { prisma } from "../database/prisma-client";
import { Installation, InstallationCreate, InstallationRepository } from "../interfaces/installation.interface";

class InstallationModel implements InstallationRepository {
    async create(installation: InstallationCreate): Promise<Installation> {
        const clientCreated = await prisma.installation.create({
            data: {
                clientName: installation?.clientName || 'DefaultName',
                number: installation.number,
                clientNumber: installation?.clientNumber || '0',
            }
        });
        return clientCreated;
    }


    async findAll(): Promise<Installation[]> {
        const clients = await prisma.installation.findMany();
        return clients;
    }

    async findById(id: string): Promise<Installation | null> {
        const installation = await prisma.installation.findUnique({
            where: {
                id
            }
        });
        return installation;
    }

    async findByInstallationNumber(installationNumber: string): Promise<Installation | null> {
        const client = await prisma.installation.findFirst({
            where: {
                number: installationNumber
            }
        });
        return client;
    }
}


export { InstallationModel }

