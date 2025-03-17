import type { PaymentMethod } from '@prisma/client'

export type Order = {
  id: string
  value: number
  createdAt: Date
  paymentBy: PaymentMethod
  address: Address
}

export type Address = {
  id: string
  cep: string
  street: string
  number: number
  neighborhood: string
  complement?: string | null
  city: string
  uf: string
}

export type CreateAddressInput = Omit<Address, 'id'>

export type CreateOrderInput = Pick<Order, 'value' | 'paymentBy'> & {
  address: CreateAddressInput
}

export interface IOrderRepository {
  create(
    addressData: Address,
    orderData: Omit<CreateOrderInput, 'address'>
  ): Promise<Order>
  findById(id: string): Promise<Order | null>
  findAll(): Promise<Order[]>
}
