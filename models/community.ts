import { type UserProfile } from './userProfile'

type Community = {
  id: number
  createdAt: string
  isSecret: boolean
  members: Member[]
  name: string

  image?: string
}

type CommunityRequest = {
  user: UserProfile
  updatedAt: string
}

type Member = {
  role: 'admin' | 'member'
  wins: number
  losses: number
  ties: number
} & UserProfile

export type { Community, CommunityRequest }
