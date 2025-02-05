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
}

type Army = BaseArmy & {
  roster: (Unit | Team | Embarked)[]
  user: UserProfile
  isValid: boolean
}

type GameArmy = BaseArmy & {
  roster: (GameUnit | GameTeam | GameEmbarked)[]
}

type ArmyBuilder = BaseArmy & {
  units: Unit[]
  user: UserProfile
}

export type { Army, ArmyBuilder, GameArmy }
