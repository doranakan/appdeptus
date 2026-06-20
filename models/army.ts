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

type BattleSize = 'incursion' | 'strike_force' | 'free'

type BaseArmy = {
  codex: Codex
  id: number
  name: string
  points: number
  detachments: [Detachment, ...Detachment[]]
  battleSize: BattleSize
}

type Army = BaseArmy & {
  roster: (Unit | Team | Embarked)[]
  user: UserProfile
  isSecret: boolean
  isValid: boolean
}

type GameArmy = BaseArmy & {
  roster: (GameUnit | GameTeam | GameEmbarked)[]
}

type ArmyBuilder = Omit<BaseArmy, 'detachments'> & {
  units: Unit[]
  user: UserProfile
} & {
  detachments: Detachment[]
}

export type { Army, ArmyBuilder, BattleSize, GameArmy }
