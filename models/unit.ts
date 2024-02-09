import { UnitTier } from './unitTier'

type Unit = {
  id: string
  name: string
  caption?: string
  leader: boolean
  limit: number
  tiers: UnitTier[]
}

export type { Unit }
