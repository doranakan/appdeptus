import { type Codex } from './codex'
import { type Detachment, type Enhancement } from './detachment'
import { type ArmyUnit, type CodexUnit } from './unit'
import { type UnitTier } from './unitTier'
import { type UnitUpgrade } from './unitUpgrade'

type Army = {
  codex: Codex
  id: string
  name: string
  totalPoints: number
  detachment: Detachment
  units: ArmyUnit[]
}

type ArmyForm = {
  name: string
  codexId: Codex['id']
  detachment: {
    id: Detachment['id']
    enhancements: Enhancement['id'][]
  }
  units: {
    unit: CodexUnit['id']
    tier: UnitTier['id']
    upgrades: UnitUpgrade['id'][]
  }[]
  totalPoints: number
}

export type { Army, ArmyForm }
