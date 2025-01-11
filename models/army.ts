import { type Codex } from './codex'
import { type Detachment } from './detachment'
import {
  type Embarked,
  type GameEmbarked,
  type GameTeam,
  type GameUnit,
  type Team,
  type Unit
} from './unit'
import { type UserProfile } from './userProfile'

type BaseArmy = {
  codex: Codex
  id: number
  name: string
  points: number
  detachment: Detachment
  user: UserProfile
}
type Army = BaseArmy & {
  roster: (Unit | Team | Embarked)[]
}

type GameArmy = {
  roster: (GameUnit | GameTeam | GameEmbarked)[]
}

type ArmyBuilder = BaseArmy & {
  units: Unit[]
}

export type { Army, ArmyBuilder, GameArmy }
