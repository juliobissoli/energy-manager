import Fastify, { FastifyInstance } from "fastify"
import cors from '@fastify/cors'

import { clientRoutes } from "./routes/client.routes"
import { invoiceRoutes } from "./routes/invoice.routes"
import { installationRoutes } from "./routes/installation.routes"

const app: FastifyInstance = Fastify({
    logger: false
})


app.register(cors, {
    origin: "*"
})


app.register(installationRoutes, { prefix: '/installations' })
app.register(invoiceRoutes, { prefix: '/invoices' })

// Run the server!
app.listen(
    { port: 3000 },
    () => console.log("Server is running in http://localhost:3000")
)


