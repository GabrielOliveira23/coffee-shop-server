import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { responseOrderSchema } from '../order.schema'
import { OrderService } from '../order.service'

export const getAllOrdersRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/orders',
    {
      schema: {
        operationId: 'getAllOrders',
        summary: 'Find all registered orders',
        tags: ['Order'],
        description: 'Description very cool',
        response: {
          200: z.object({
            orders: z.array(responseOrderSchema),
          }),
        },
      },
    },
    async (_, reply) => {
      const { orders } = await OrderService().getAllOrders()

      return reply.status(200).send({ orders })
    }
  )
}
