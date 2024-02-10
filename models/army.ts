import { Codex } from './codex'
import { ArmyUnit } from './unit'

type Army = {
  codex: Codex
  id: string
  name: string
  totalPoints: number
  units: ArmyUnit[]
}

export type { Army }
