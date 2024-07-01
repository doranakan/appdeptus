import { z } from 'zod'

const userProfileSchema = z.object({
  name: z.string()
})

export { userProfileSchema }
