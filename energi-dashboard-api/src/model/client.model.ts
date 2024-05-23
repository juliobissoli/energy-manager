import { prisma } from "../database/prisma-client";
import { Client, ClientCreate, ClientRepository } from "../interfaces/client.interface";

class ClientModel implements ClientRepository {
    async create(client: ClientCreate): Promise<Client> {
        const clientCreated = await prisma.client.create({
            data: {
                name: client?.name || 'DefautName',
                clientNumber: client.clientNumber,
            }
        });
        return clientCreated;
    }


    async findAll(): Promise<Client[]> {
        const clients = await prisma.client.findMany();
        return clients;
    }

    async findByClientNumber(clientNumber: number): Promise<Client | null> {
        const client = await prisma.client.findFirst({
            where: {
                clientNumber
            }
        });
        return client;
    }
}

export { ClientModel }

