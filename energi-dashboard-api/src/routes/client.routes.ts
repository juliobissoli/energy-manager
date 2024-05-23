import { FastifyInstance } from "fastify";
import { ClientCreate } from "../interfaces/client.interface";
import ClientController from "../controller/client.controller";

export async function clientRoutes(fastify: FastifyInstance) {
    fastify.post<{Body: ClientCreate}>('/', async (req, reply) => {
        const clientController = new ClientController();
        try {
            
            const client = await clientController.create(req.body);

            reply.status(201).send(client);
        } catch (error) {
            reply.send(error);
        }
    });


    fastify.get('/', async (req, reply) => {
        const clientController = new ClientController();
        try {
            const clients = await clientController.findAll();
            reply.send(clients);
        } catch (error) {
            reply.send(error);
        }
    });
}

