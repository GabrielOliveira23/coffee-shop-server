import type { PaymentMethod } from '@prisma/client'
import { prisma } from '../../database/prisma-client'
import type {
  Address,
  CreateAddressInput,
  CreateOrderInput,
  IOrderRepository,
  Order,
} from './order.types'

export class OrderRepository implements IOrderRepository {
  private async createAddress(address: CreateAddressInput): Promise<Address> {
    return await prisma.address.create({ data: address })
  }

  private async findAddressByCep(cep: string): Promise<Address | null> {
    return await prisma.address.findFirst({
      where: { cep },
    })
  }

  private async ensureAddressExists(
    addressData: CreateAddressInput
  ): Promise<Address> {
    const addressAlreadyExists = await this.findAddressByCep(addressData.cep)
    return addressAlreadyExists ?? (await this.createAddress(addressData))
  }

  async create(
    addressData: CreateAddressInput,
    orderData: Omit<CreateOrderInput, 'address'>
  ): Promise<Order> {
    const address = await this.ensureAddressExists(addressData)

    const newOrder = await prisma.order.create({
      data: {
        ...orderData,
        addressId: address.id,
      },
      include: {
        address: true,
      },
    })

    return {
      id: newOrder.id,
      value: newOrder.value,
      createdAt: newOrder.createdAt,
      paymentBy: newOrder.paymentBy,
      address: {
        id: newOrder.address.id,
        cep: newOrder.address.cep,
        street: newOrder.address.street,
        number: newOrder.address.number,
        neighborhood: newOrder.address.neighborhood,
        complement: newOrder.address.complement,
        city: newOrder.address.city,
        uf: newOrder.address.uf,
      },
    }
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { address: true },
    })

    if (!order) {
      return null
    }

    return {
      id: order.id,
      value: order.value,
      createdAt: order.createdAt,
      paymentBy: order.paymentBy,
      address: {
        id: order.address.id,
        cep: order.address.cep,
        street: order.address.street,
        number: order.address.number,
        neighborhood: order.address.neighborhood,
        complement: order.address.complement,
        city: order.address.city,
        uf: order.address.uf,
      },
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: {
        address: true,
      },
    })

    return orders
  }
}
