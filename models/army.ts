import { type Codex } from './codex'
import { type Detachment } from './detachment'
import { type Team, type Unit } from './unit'

type BaseArmy = {
  codex: Codex
  id: number
  name: string
  points: number
  detachment: Detachment
}
type Army = BaseArmy & {
  units: (Unit | Team)[]
}

type ArmyBuilder = BaseArmy & {
  units: Unit[]
}

export type { Army, ArmyBuilder }
