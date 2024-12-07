import { z } from 'zod'

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/

const registrationSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(8, { message: 'The password should be at least 8 characters long' })
      .regex(PASSWORD_REGEX, {
        message:
          'The password must include at least one uppercase, lowercase, number and special characters'
      }),
    email: z.string().email({ message: 'Invalid email' }),
    name: z
      .string()
      .min(1, {
        message: 'Add your battle name'
      })
      .transform((val) => val.trim()),
    password: z
      .string()
      .min(8, { message: 'The password should be at least 8 characters long' })
      .regex(PASSWORD_REGEX, {
        message:
          'The password must include at least one uppercase, lowercase, number and special characters'
      }),
    privacyAccepted: z.literal(true, {
      message: 'Accepting the privacy policy is mandatory'
    })
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

type Registration = z.infer<typeof registrationSchema>

export type { Registration }

export { registrationSchema }
