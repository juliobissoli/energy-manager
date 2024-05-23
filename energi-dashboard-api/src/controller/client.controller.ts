import { Client, ClientCreate, ClientRepository } from "../interfaces/client.interface";
import { ClientModel } from "../model/client.model";

class ClientController {
    private clientRepository: ClientRepository;
    constructor() {
        this.clientRepository = new ClientModel();
    }


    async create({ name, clientNumber }: ClientCreate): Promise<Client> {

        const verifyClient = await this.findByClientNumber(clientNumber);
        if (verifyClient) {
            throw new Error('Client already exists');
        }

        const client = await this.clientRepository.create({ name, clientNumber });
        return client;
    }

    async findByClientNumber(clientNumber: number): Promise<Client | null> {
        const client = await this.clientRepository.findByClientNumber(clientNumber);
        return client;
    }

    async findAll(): Promise<Client[]> {
        const clients = await this.clientRepository.findAll();
        return clients;
    }
}


export default ClientController;

