import { FastifyInstance } from "fastify";
import { createInstallationDocs, InstallationCreate } from "../interfaces/installation.interface";
import InstallationController from "../controller/installation/installation.cintroller";


export async function installationRoutes(fastify: FastifyInstance) {

    fastify.post<{ Body: InstallationCreate }>('/', createInstallationDocs, async (req, reply) => {
        const installationController = new InstallationController();
        try {

            const installation = await installationController.create(req.body);

            reply.status(201).send(installation);
        } catch (error) {
            reply.send(error);
        }
    });



    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const installationController = new InstallationController();
        const { id } = req.params;
        try {
            const installation = await installationController.findById(id);
            if (!installation) {
                reply.status(404).send({ message: 'Instalação não encontrada' });
            } else {
                reply.send(installation);
            }
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    fastify.get<{ Params: { number: string } }>('/number/:number', async (req, reply) => {
        const installationController = new InstallationController();
        const { number } = req.params;
        try {
            const installation = await installationController.findByInstallationNumber(number);
            if (!installation) {
                reply.status(404).send({ message: 'Instalação não encontrada' });
            } else {
                reply.send(installation);
            }
        } catch (error) {
            reply.status(500).send(error);
        }
    });


    fastify.get('/', async (req, reply) => {
        const installationController = new InstallationController();
        try {
            const installations = await installationController.findAll();
            reply.send(installations);
        } catch (error) {
            reply.send(error);
        }
    });


}

