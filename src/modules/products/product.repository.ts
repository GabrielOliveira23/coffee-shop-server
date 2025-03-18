import { prisma } from '../../database/prisma-client'

import type {
  CreateProductInput,
  IProductRepository,
  Product,
} from './product.types'

export class ProductRepository implements IProductRepository {
  async create(data: CreateProductInput): Promise<Omit<Product, 'image'>> {
    const result = await prisma.product.create({ data })

    return result
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } })

    return product
      ? {
          ...product,
          image: product.image ? Buffer.from(product.image) : null,
        }
      : null
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({ where: { name } })

    return product
      ? {
          ...product,
          image: product.image ? Buffer.from(product.image) : null,
        }
      : null
  }

  async findAll(): Promise<Product[]> {
    const result = await prisma.product.findMany()

    return result.map(product => ({
      ...product,
      image: product.image ? Buffer.from(product.image) : null,
    }))
  }

  async addImage(id: string, image: Buffer): Promise<Product> {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { image },
      })
      return { ...updatedProduct, image: image }
    } catch (error) {
      throw new Error('Error updating product image')
    }
  }
}
