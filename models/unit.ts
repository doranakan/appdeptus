import { UnitTier } from './unitTier'

type BaseUnit = {
  id: string
  name: string
  caption?: string
  leader: boolean
}

type ArmyUnit = BaseUnit & {
  tier: UnitTier
}

type CodexUnit = BaseUnit & {
  limit: number
  tiers: UnitTier[]
}

export type { ArmyUnit, CodexUnit }