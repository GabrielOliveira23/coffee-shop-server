export type Product = {
  id: string
  name: string
  description: string
  price: number
  tags: string[]
  image: Buffer | null
}

export type CreateProductInput = Omit<Product, 'id' | 'image'>

export type FindProductByIdInput = Pick<Product, 'id'>

export interface IProductRepository {
  create(data: CreateProductInput): Promise<Omit<Product, 'image'>>
  findById(id: string): Promise<Product | null>
  findByName(name: string): Promise<Product | null>
  findAll(): Promise<Product[]>
  addImage(id: string, image: Buffer): Promise<Product>
}
