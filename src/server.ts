import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { createOrderRoute } from './modules/order/routes/create-order.route'
import { getAllOrdersRoute } from './modules/order/routes/get-all-orders.route'
import { getOrderByIdRoute } from './modules/order/routes/get-order-by-id.route'
import { createProductRoute } from './modules/products/routes/create-product.route'
import { getAllProductsRoute } from './modules/products/routes/get-all-products.route'
import { getProductByIdRoute } from './modules/products/routes/get-product-by-id.route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: 'http://localhost:3000' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Coffee Shop',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(createProductRoute)
app.register(getProductByIdRoute)
app.register(getAllProductsRoute)

app.register(createOrderRoute)
app.register(getAllOrdersRoute)
app.register(getOrderByIdRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running')
})
