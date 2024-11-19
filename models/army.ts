import { type Codex } from './codex'
import { type Detachment } from './detachment'
import {
  type Character,
  type Leader,
  type Squad,
  type Team,
  type Transport,
  type Unit,
  type Vehicle
} from './unit'

type BaseArmy = {
  codex: Codex
  id: number
  name: string
  points: number
}

type Army = BaseArmy & {
  composition: {
    characters: Character[]
    detachment: Detachment
    leaders: Leader[]
    squads: Squad[]
    teams: Team[]
    transports: Transport[]
    vehicles: Vehicle[]
  }
}

type ArmyBuilder = BaseArmy & {
  units: Unit[]
  detachment: Detachment
}

export type { Army, ArmyBuilder }
