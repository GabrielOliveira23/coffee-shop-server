import { prisma } from '../../database/prisma-client'
import type { Product } from '../products/product.types'
import type {
  Address,
  AddressInput,
  IOrderRepository,
  OrderFromPrisma,
  OrderInput,
  OrderProductInput,
} from './order.types'

export class OrderRepository implements IOrderRepository {
  private async createAddress(address: AddressInput): Promise<Address> {
    return await prisma.address.create({ data: address })
  }

  private async findAddressByCep(cep: string): Promise<Address | null> {
    return await prisma.address.findFirst({
      where: { cep },
    })
  }

  private async ensureAddressExists(
    addressData: AddressInput
  ): Promise<Address> {
    const addressAlreadyExists = await this.findAddressByCep(addressData.cep)
    return addressAlreadyExists ?? (await this.createAddress(addressData))
  }

  private calcTotal(
    prismaProducts: Pick<Product, 'id' | 'name' | 'price'>[],
    orderProducts: OrderProductInput[]
  ) {
    return orderProducts.reduce((acc, item) => {
      const product = prismaProducts.find(p => p.id === item.productId)
      return acc + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  async create(
    addressData: AddressInput,
    { products: orderProducts, paymentBy }: Omit<OrderInput, 'address'>
  ): Promise<Pick<OrderFromPrisma, 'order' | 'products'>> {
    const address = await this.ensureAddressExists(addressData)

    const prismaProducts = await prisma.product.findMany({
      where: { id: { in: orderProducts.map(p => p.productId) } },
      select: { id: true, name: true, price: true },
    })

    if (prismaProducts.length !== orderProducts.length) {
      throw new Error('Um ou mais produtos não existem.')
    }

    const totalValue = this.calcTotal(prismaProducts, orderProducts)

    const newOrder = await prisma.order.create({
      data: {
        paymentBy: paymentBy,
        value: totalValue,
        addressId: address.id,
        products: {
          create: orderProducts.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
      include: {
        address: true,
        products: true,
      },
    })

    return { order: newOrder, products: prismaProducts }
  }

  async findById(id: string): Promise<OrderFromPrisma | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { address: true, products: true },
    })

    if (!order) {
      return null
    }

    const products = await prisma.product.findMany({
      where: { id: { in: order.products.map(p => p.productId) } },
      select: { id: true, name: true, price: true },
    })

    return { order, orderProducts: order.products, products }
  }

  async findAll(): Promise<OrderFromPrisma[]> {
    const orders = await prisma.order.findMany({
      include: {
        address: true,
        products: true,
      },
    })

    return Promise.all(
      orders.map(async order => {
        const products = await prisma.product.findMany({
          where: { id: { in: order.products.map(p => p.productId) } },
          select: { id: true, name: true, price: true },
        })
        console.log(`findAll products ${products}`)
        return { order, orderProducts: order.products, products }
      })
    )
  }
}
