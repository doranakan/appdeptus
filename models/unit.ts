import { type UnitTier } from './unitTier'

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
  tiers: UnitTier[]
}

export type { ArmyUnit, CodexUnit }
