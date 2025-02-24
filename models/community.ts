import { type UserProfile } from './userProfile'

type Community = {
  id: number
  createdAt: string
  members: Member[]
  name: string

  image?: string
}

type Member = {
  role: 'admin' | 'member'
} & UserProfile

export type { Community }
