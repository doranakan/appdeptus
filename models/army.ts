import { type Codex } from './codex'
import { type ArmyUnit, type CodexUnit } from './unit'
import { type UnitTier } from './unitTier'
import { type CodexOption, type Weapon } from './weapon'

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
  choices: {
    unit: CodexUnit['id']
    tier: UnitTier['id']
    options: {
      optionId: CodexOption['id']
      weaponId: Weapon['id']
    }[]
  }[]
  totalPoints: number
}

export type { Army, ArmyForm }
