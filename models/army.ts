import { Codex } from './codex'
import { CodexUnit } from './unit'
import { UnitTier } from './unitTier'

type Army = {
  codex: Codex
  id: string
  name: string
  totalPoints: number
  units: ChosenUnit[]
}

type ChosenUnit = Omit<CodexUnit, 'tiers'> & {
  tier: UnitTier
}

export type { Army }
