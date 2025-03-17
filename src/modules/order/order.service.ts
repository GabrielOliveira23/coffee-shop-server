import { OrderRepository } from './order.repository'
import type { CreateOrderInput, Order } from './order.types'

export function OrderService() {
  const orderRepository = new OrderRepository()

  return {
    async createOrder(
      data: CreateOrderInput
    ): Promise<{ createdOrder: Order }> {
      const { address: addressData, ...orderData } = data

      const createdOrder = await orderRepository.create(addressData, orderData)

      return { createdOrder }
    },

    async getOrderById(id: string): Promise<{ order: Order | null }> {
      const order = await orderRepository.findById(id)

      return { order }
    },

    async getAllOrders(): Promise<{ orders: Order[] }> {
      const orders = await orderRepository.findAll()

      return { orders }
    },
  }
}
