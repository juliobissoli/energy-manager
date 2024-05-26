import Fastify, { FastifyInstance } from "fastify"
import cors from '@fastify/cors'

import { invoiceRoutes } from "./routes/invoice.routes"
import { installationRoutes } from "./routes/installation.routes"

const app: FastifyInstance = Fastify({
    logger: false
})


app.register(cors, {
    origin: "*"
})

app.register(require('@fastify/swagger'))

app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})


app.register(installationRoutes, { prefix: '/installations' })
app.register(invoiceRoutes, { prefix: '/invoices' })

// Run the server!
app.listen(
    { port: 3000 },
    () => console.log("Server is running in http://localhost:3000")
)


