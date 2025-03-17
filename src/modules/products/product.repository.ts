import { prisma } from '../../database/prisma-client'
import type { Product } from '../../interfaces/product.type'
import type { CreateProductInput, IProductRepository } from './product.types'

export class ProductRepository implements IProductRepository {
  async create(data: CreateProductInput) {
    const result = await prisma.product.create({ data })

    return result
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({ where: { id } })

    return product
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({ where: { name } })

    return product
  }

  async findAll(): Promise<Product[]> {
    const result = await prisma.product.findMany()

    return result
  }
}
