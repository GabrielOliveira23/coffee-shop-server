import { promisify } from 'node:util'
import { type MultipartFile, fastifyMultipart } from '@fastify/multipart'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ProductService } from '../product.service'

export const addProductImageRoute: FastifyPluginAsyncZod = async app => {
  app.register(fastifyMultipart)

  app.patch(
    '/products/:productId/image',
    {
      schema: {
        operationId: 'addProductImage',
        summary: 'Add an image to a product',
        tags: ['Product'],
        description: 'Description very cool',
        params: z.object({
          productId: z.string(),
        }),
        response: {
          200: z.object({
            product: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string(),
              price: z.number(),
              tags: z.array(z.string()),
              image: z.instanceof(Buffer).nullable(),
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { productId } = request.params
      const file = await request.file()

      if (!file) {
        return reply.status(400).send({ message: 'No file uploaded' })
      }

      try {
        const imageBuffer = await fileToBuffer(file)

        const { product } = await ProductService().addImageToProduct(
          productId,
          imageBuffer
        )

        if (product) {
          return reply.status(200).send({ product })
        }

        return reply
          .status(400)
          .send({ message: 'Error when updating product image' })
      } catch (error) {
        return reply.status(500).send({ message: 'Error processing the image' })
      }
    }
  )
}

async function fileToBuffer(file: MultipartFile): Promise<Buffer> {
  const streamToBuffer = promisify(
    (
      stream: NodeJS.ReadableStream,
      callback: (err: Error | null, result?: Buffer) => void
    ) => {
      const buffers: Buffer[] = []
      stream.on('data', (chunk: Buffer) => buffers.push(chunk))
      stream.on('end', () => callback(null, Buffer.concat(buffers)))
      stream.on('error', callback)
    }
  )

  if (!file.file) {
    throw new Error('File stream is undefined')
  }

  const buffer = await streamToBuffer(file.file as NodeJS.ReadableStream)

  if (!buffer) {
    throw new Error('Failed to convert file stream to buffer')
  }
  return buffer
}
