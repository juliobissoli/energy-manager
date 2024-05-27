import Fastify, { FastifyInstance } from "fastify"
import cors from '@fastify/cors'

import { invoiceRoutes } from "./routes/invoice.routes"
import { installationRoutes } from "./routes/installation.routes"


import config from "./config"

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
    { port: config.apiPort  },
    () => {
       console.log("Server is running in ", config.apiHost)
      console.log('Show API documentation in ', config.apiHost + '/docs')
      console.log('============ > ', process.env.API_PORT)
      }
    )


