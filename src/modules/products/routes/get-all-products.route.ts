import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { ProductService } from '../product.service'

export const getAllProductsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/products',
    {
      schema: {
        operationId: 'getAllProducts',
        summary: 'Get all registered products',
        tags: ['Product'],
        description: 'Description very cool',
        response: {
          200: z.object({
            products: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
                price: z.number(),
                tags: z.array(z.string()),
              })
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const { products } = await ProductService().getAllProducts()

      return reply.status(200).send({ products })
    }
  )
}
