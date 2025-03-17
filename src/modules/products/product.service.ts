import type { Product } from '../../interfaces/product.type'
import { ProductRepository } from './product.repository'
import type { CreateProductInput } from './product.types'

export function ProductService() {
  const productRepository = new ProductRepository()

  return {
    async createProduct(
      data: CreateProductInput
    ): Promise<{ product: Product | null }> {
      const productExists = await productRepository.findByName(data.name)

      if (productExists) {
        throw new Error('Product with this name already exists')
      }

      const product = await productRepository.create(data)

      return { product }
    },

    async getProductById(id: string): Promise<{ product: Product | null }> {
      const product = await productRepository.findById(id)
      return { product }
    },

    async getAllProducts(): Promise<{ products: Product[] }> {
      const products = await productRepository.findAll()
      return { products }
    },
  }
}
