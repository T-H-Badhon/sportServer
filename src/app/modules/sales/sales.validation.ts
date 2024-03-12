import { z } from 'zod'

const saleValidationSchema = z.object({
  body: z.object({
    sellQuantity: z.number(),
    buyerName: z.string(),
    date: z.string(),
  }),
})

export const saleValidations = {
  saleValidationSchema,
}
