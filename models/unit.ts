import { UnitTier } from './unitTier'

type CodexUnit = {
  id: string
  name: string
  caption?: string
  leader: boolean
  limit: number
  tiers: UnitTier[]
}

export type { CodexUnit }
