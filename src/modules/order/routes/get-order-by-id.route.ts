import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { responseOrderSchema } from '../order.schema'
import { OrderService } from '../order.service'

export const getOrderByIdRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/orders/:orderId',
    {
      schema: {
        operationId: 'getOrderById',
        summary: 'Find an order by Id',
        tags: ['Order'],
        description: 'Description very cool',
        params: z.object({
          orderId: z.string().uuid('OrderId invalid'),
        }),
        response: {
          200: z.object({
            order: responseOrderSchema,
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { orderId } = request.params

      const { order } = await OrderService().getOrderById(orderId)

      if (!order) return reply.status(404).send({ message: 'Order not found' })
      return reply.status(200).send({ order })
    }
  )
}
