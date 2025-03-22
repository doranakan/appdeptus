import { z } from 'zod'

const userProfileSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    created_at: z.string(),
    image: z.string().optional()
  })
  .transform(({ created_at, ...rest }) => ({ ...rest, createdAt: created_at }))

export { userProfileSchema }
