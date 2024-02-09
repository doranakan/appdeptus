import { Codex } from './codex'
import { Unit } from './unit'
import { UnitTier } from './unitTier'

type Army = {
  codex: Codex
  id: string
  name: string
  totalPoints: number
  units: ChosenUnit[]
}

type ChosenUnit = Omit<Unit, 'tiers'> & {
  tier: UnitTier
}

export type { Army }
