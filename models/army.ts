import { type Codex } from './codex'
import { type Detachment } from './detachment'
import {
  type Character,
  type Leader,
  type Squad,
  type Team,
  type Transport,
  type Unit,
  type Vehicle,
  type Warlord
} from './unit'

type BaseArmy = {
  codex: Codex
  id: string
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
    warlord: Warlord
  }
}

type ArmyBuilder = BaseArmy & {
  units: Unit[]
  warlord: Warlord
  detachment: Detachment
}

export type { Army, ArmyBuilder }
