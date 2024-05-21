import { z } from 'zod'

const productValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required!' }),
    branch: z.string(),
    price: z.number({
      required_error: 'price is required!',
      invalid_type_error: 'price must be in number!',
    }),
    quantity: z.number({ required_error: 'quantity is required!' }),
    sportsType: z.string({ required_error: 'sports type is required!' }),
    brand: z.string({ required_error: 'brand is required!' }),
    size: z
      .number({ invalid_type_error: 'size must be in number!' })
      .optional(),
    material: z.string({ required_error: 'material is required!' }),
    color: z.string({ required_error: 'color is required!' }),
    condition: z.enum(['new', 'used']),
    weight: z
      .number({ invalid_type_error: 'weight must be in number!' })
      .optional(), // it's an additional information not  mandatory
  }),
})
const UpdateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required!' }).optional(),
    branch: z.string().optional(),
    price: z
      .number({
        required_error: 'price is required!',
        invalid_type_error: 'price must be in number!',
      })
      .optional(),
    quantity: z.number({ required_error: 'quantity is required!' }).optional(),
    sportsType: z
      .string({ required_error: 'sports type is required!' })
      .optional(),
    brand: z.string({ required_error: 'brand is required!' }).optional(),
    size: z
      .number({ invalid_type_error: 'size must be in number!' })
      .optional(),
    material: z.string({ required_error: 'material is required!' }).optional(),
    color: z.string({ required_error: 'color is required!' }).optional(),
    condition: z.enum(['new', 'used']).optional(),
    weight: z
      .number({ invalid_type_error: 'weight must be in number!' })
      .optional(), // it's an additional information not  mandatory
  }),
})

export const productValidations = {
  productValidationSchema,
  UpdateProductValidationSchema,
}
