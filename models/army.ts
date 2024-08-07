import { type Codex } from './codex'
import { type ArmyUnit, type CodexUnit } from './unit'
import { type UnitTier } from './unitTier'

type Army = {
  codex: Codex
  id: string
  name: string
  totalPoints: number
  units: ArmyUnit[]
}

type ArmyForm = {
  name: string
  codexId: Codex['id']
  units: {
    unit: CodexUnit['id']
    tier: UnitTier['id']
  }[]
  totalPoints: number
}

export type { Army, ArmyForm }
