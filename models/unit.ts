import { type UnitTier } from './unitTier'
import { type OptionalWeapon, type Weapon } from './weapon'

type BaseUnit = {
  id: string
  name: string
  caption?: string
  leader: boolean
}

type ArmyUnit = BaseUnit & {
  tier: UnitTier
  options: {
    id: OptionalWeapon['id']
    weapon: Weapon
  }[]
}

type CodexUnit = BaseUnit & {
  limit: number
  tiers: UnitTier[]
}

export type { ArmyUnit, CodexUnit }
