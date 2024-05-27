export interface Installation {
    id: string;
    number: string;
    clientName: string;
    clientNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InstallationCreate {
    number: string;
    clientName?: string;
    clientNumber?: string;
}



export interface InstallationRepository {
    create(client: InstallationCreate): Promise<Installation>;
    findAll(): Promise<Installation[]>;
    findByInstallationNumber(installationNumber: string): Promise<Installation | null>;
    findById(id: string): Promise<Installation | null>;
    // findByInstalationNumber(instalationNumber: number): Promise<Client>;
    // update(id: string, client: Client): Promise<Client>;
    // delete(id: string): Promise<void>;
}

