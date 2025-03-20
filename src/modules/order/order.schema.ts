import { z } from 'zod'

const responseAddressSchema = z.object({
  cep: z.string().regex(/^\d{5}-\d{3}$/),
  street: z.string(),
  number: z.number(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.string().regex(/^[A-Z]{2}$/),
  complement: z.string().nullish(),
})

const responseOrderProductSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export const responseOrderSchema = z.object({
  id: z.string(),
  products: z.array(responseOrderProductSchema),
  value: z.number(),
  paymentBy: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'MONEY']),
  address: responseAddressSchema,
})

const requestAddressSchema = z.object({
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP must match regex'),
  street: z.string().min(3, 'Street must have at least 3 characters'),
  number: z.number().gte(0, 'Number must be positive'),
  neighborhood: z
    .string()
    .min(3, 'Neighborhood must have at least 3 characters'),
  city: z.string().min(3, 'City must have at least 3 characters'),
  uf: z.string().regex(/^[A-Z]{2}$|^[a-z]{2}$/, 'UF must match 2 characters'),
  complement: z.string().nullish(),
})

const requestOrderProductSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
})

export const requestOrderSchema = z.object({
  products: z.array(requestOrderProductSchema),
  value: z.number().gte(0, 'Value must be greater than 0.'),
  paymentBy: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'MONEY']),
  address: requestAddressSchema,
})
