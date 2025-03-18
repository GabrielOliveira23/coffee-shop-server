import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ProductService } from '../product.service'

export const createProductRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/products',
    {
      schema: {
        operationId: 'createProduct',
        summary: 'Create a new product',
        tags: ['Product'],
        description: 'Description very cool',
        body: z.object({
          name: z.string(),
          description: z.string().min(4, 'Description too short.'),
          price: z.number().min(0, 'Price must be greater than 0.'),
          tags: z.array(z.string().min(3, 'Tag name too short.')),
        }),
        response: {
          201: z.object({
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
      const { name, description, price, tags } = request.body

      const { product } = await ProductService().createProduct({
        name,
        description,
        price,
        tags,
      })

      if (product !== null) return reply.status(201).send({ product })

      return reply.status(400).send({ message: 'Error when creating product' })
    }
  )
}
