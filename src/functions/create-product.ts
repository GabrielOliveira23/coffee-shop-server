interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export async function createProduct({
  name,
  description,
  price,
  tags,
}: CreateProductParams) {
  

  return { productId: product.id };
}
