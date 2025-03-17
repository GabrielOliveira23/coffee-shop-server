import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ProductService } from '../product.service'

export const findProductRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/products/:productId',
    {
      schema: {
        operationId: 'findProductById',
        summary: 'Find a product by Id',
        tags: ['Product'],
        description: 'Description very cool',
        params: z.object({
          productId: z.string(),
        }),
        response: {
          200: z.object({
            product: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string(),
              price: z.number(),
              tags: z.array(z.string()),
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { productId } = request.params

      const { product } = await ProductService().getProductById(productId)

      if (product !== null) return reply.status(200).send({ product })

      return reply.status(404).send({ message: 'Product not found' })
    }
  )
}
