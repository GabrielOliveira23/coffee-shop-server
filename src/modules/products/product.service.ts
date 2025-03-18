import { ProductRepository } from './product.repository'
import type { CreateProductInput, Product } from './product.types'

export function ProductService() {
  const productRepository = new ProductRepository()

  return {
    async createProduct(
      data: CreateProductInput
    ): Promise<{ product: Omit<Product, 'image'> }> {
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

    async getAllProducts(): Promise<{
      products: Array<
        Omit<Product, 'image'> & {
          image: string | null
        }
      >
    }> {
      const products = await productRepository.findAll()

      const productsWithBase64Images = products.map(product => ({
        ...product,
        image: product.image ? product.image.toString('base64') : null,
      }))

      return { products: productsWithBase64Images }
    },

    async addImageToProduct(
      id: string,
      image: Buffer
    ): Promise<{ product: Product }> {
      const product = await productRepository.addImage(id, image)
      return { product }
    },
  }
}
