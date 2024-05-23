export interface Client {
    id: String;
    name: String;
    clientNumber: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ClientCreate {
    name?: string;
    clientNumber: number;
}


export interface ClientRepository {
    create(client: ClientCreate): Promise<Client>;
    findAll(): Promise<Client[]>;
    findByClientNumber(clientNumber: number): Promise<Client | null>;
    // findById(id: string): Promise<Client>;
    // findByInstalationNumber(instalationNumber: number): Promise<Client>;
    // update(id: string, client: Client): Promise<Client>;
    // delete(id: string): Promise<void>;
}

