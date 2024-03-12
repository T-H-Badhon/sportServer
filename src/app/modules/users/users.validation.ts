import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'usename is required' }),
    name: z.string({ required_error: 'name is required' }),
    role: z.enum(['admin', 'manager', 'seller']),
    branch: z.string().optional(),
    email: z
      .string({ required_error: 'email is required' })
      .email({ message: 'invalid email' }),
    password: z.string({ required_error: 'password is required' }).refine(
      (password) => {
        const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

        return alphanumericRegex.test(password)
      },
      {
        message: 'password must be alpaneumeric and minimum 6 characters long',
      },
    ),
  }),
})

const loginCredentialValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
})

export const userValitdations = {
  userValidationSchema,
  loginCredentialValidationSchema,
}
