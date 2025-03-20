import type { PaymentMethod } from '@prisma/client'
import type { Product } from '../products/product.types'

export type Order = {
  id: string
  value: number
  products: OrderProduct[]
  createdAt: Date
  paymentBy: PaymentMethod
  address: Address
}

export type OrderProduct = Pick<Product, 'name' | 'price'> & {
  productId: string
  quantity: number
}

export type OrderProductInput = Pick<OrderProduct, 'productId' | 'quantity'>

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

export type AddressInput = Omit<Address, 'id'>

export type OrderInput = Pick<Order, 'paymentBy'> & {
  address: AddressInput
  products: OrderProductInput[]
}

export type OrderFromPrisma = {
  order: Omit<Order, 'products'>
  orderProducts: Pick<OrderProduct, 'productId' | 'quantity'>[]
  products: Pick<Product, 'id' | 'name' | 'price'>[]
}

export interface IOrderRepository {
  create(
    addressData: Address,
    orderData: Omit<OrderInput, 'address'>
  ): Promise<Pick<OrderFromPrisma, 'order' | 'products'>>
  findById(id: string): Promise<OrderFromPrisma | null>
  findAll(): Promise<OrderFromPrisma[]>
}
