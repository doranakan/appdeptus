import { z } from 'zod'

const userProfileSchema = z.object({
  id: z.string(),
  name: z.string()
})

export { userProfileSchema }
