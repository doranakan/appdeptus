import { type Codex } from './codex'
import { type Detachment } from './detachment'
import {
  type Character,
  type Leader,
  type Squad,
  type Team,
  type Transport,
  type Vehicle,
  type Warlord
} from './unit'

type Army = {
  codex: Codex
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
  id: string
  name: string
  points: number
}

export type { Army }
