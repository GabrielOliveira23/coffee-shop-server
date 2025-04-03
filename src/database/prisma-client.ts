import { PrismaClient } from '@prisma/client'
import { baseProducts } from './base-products'
import fs from 'node:fs'
import path from 'node:path'

export const prisma = new PrismaClient()

export async function seedProducts() {
  const existingProducts = await prisma.product.count()

  if (existingProducts === 0) {
    console.log('🌱 Seeding products...')

    await prisma.product.createMany({
      data: baseProducts.map(({ imagePath, ...rest }) => rest),
    })

    for (const product of baseProducts) {
      const imageBuffer = fs.readFileSync(
        path.join(__dirname, product.imagePath)
      )

      await prisma.product.update({
        where: { name: product.name },
        data: {
          image: imageBuffer,
        },
      })
    }

    console.log('✅ Products seeded!')
  }
}
