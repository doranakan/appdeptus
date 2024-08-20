import { type UnitTier } from './unitTier'
import { type UnitUpgrade } from './unitUpgrade'

type BaseUnit = {
  id: string
  name: string
}

type ArmyUnit = BaseUnit & {
  upgrades: UnitUpgrade[]
  tier: UnitTier
}

type CodexUnit = BaseUnit & {
  upgrades: UnitUpgrade[]
  tiers: UnitTier[]
}

export type { ArmyUnit, CodexUnit }
