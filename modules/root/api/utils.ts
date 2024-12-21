import { type User } from '@supabase/supabase-js'

const isNewUser = (user: User) => {
  const createdAt = new Date(user.created_at)
  const lastSignInAt = new Date(user.last_sign_in_at ?? Date.now())

  return Math.abs(createdAt.getTime() - lastSignInAt.getTime()) < 1000
}

export { isNewUser }
