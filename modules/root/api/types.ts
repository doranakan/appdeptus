import { type Session, type User } from '@supabase/supabase-js'

type Provider = 'azure'

const isProvider = (provider: string): provider is Provider =>
  provider === 'azure'

type SignInResponse = {
  user: User
  session: Session
  isNew: boolean
}

export { isProvider }

export type { Provider, SignInResponse }
