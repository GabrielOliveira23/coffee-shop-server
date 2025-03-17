import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { requestOrderSchema, responseOrderSchema } from '../order.schema'
import { OrderService } from '../order.service'

export const createOrderRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/orders',
    {
      schema: {
        operationId: 'createOrder',
        summary: 'Create a new order',
        tags: ['Order'],
        description: 'Description very cool',
        body: requestOrderSchema,
        response: {
          201: z.object({
            createdOrder: responseOrderSchema,
          }),
        },
      },
    },
    async (request, reply) => {
      const newOrder = request.body

      const { createdOrder } = await OrderService().createOrder(newOrder)

      return reply.status(201).send({ createdOrder })
    }
  )
}
