import type { Product } from '../products/product.types'
import { OrderRepository } from './order.repository'
import type {
  Order,
  OrderInput,
  OrderProduct,
  OrderProductInput,
} from './order.types'

function formatProducts(
  products: Pick<Product, 'id' | 'name' | 'price'>[],
  orderProducts: OrderProductInput[]
): OrderProduct[] {
  return orderProducts.map(orderProduct => {
    const product = products.find(p => p.id === orderProduct.productId)
    if (!product) throw new Error('Erro ao popular produtos')
    return { ...product, ...orderProduct }
  })
}

export function OrderService() {
  const orderRepository = new OrderRepository()

  return {
    async createOrder(data: OrderInput): Promise<{ createdOrder: Order }> {
      const { address: addressData, ...orderData } = data

      const { order, products } = await orderRepository.create(
        addressData,
        orderData
      )

      const orderProducts = orderData.products

      return {
        createdOrder: {
          ...order,
          products: formatProducts(products, orderProducts),
        },
      }
    },

    async getOrderById(id: string): Promise<{ order: Order } | null> {
      const result = await orderRepository.findById(id)

      if (!result) return null

      const { order, orderProducts, products } = result

      return {
        order: { ...order, products: formatProducts(products, orderProducts) },
      }
    },

    async getAllOrders(): Promise<{ orders: Order[] }> {
      const orders = await orderRepository.findAll()

      return {
        orders: orders.map(({ order, orderProducts, products }) => ({
          ...order,
          products: formatProducts(products, orderProducts),
        })),
      }
    },
  }
}
