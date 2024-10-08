import { type UnitUpgrade } from './unitUpgrade'

type BaseUnit = {
  id: string
  name: string
  upgrades: UnitUpgrade[]
  tier: Tier
}

type Character = BaseUnit & {
  type: 'character'
}

type Leader = BaseUnit & {
  type: 'leader'
}

type Squad = BaseUnit & {
  type: 'squad'
}

type Transport = BaseUnit & {
  type: 'transport'
}

type Vehicle = BaseUnit & {
  type: 'vehicle'
}

type Team = {
  leader: Leader
  bodyguard: Squad
}

type Warlord = Character | Leader

type Unit = Omit<Character | Leader | Squad | Transport | Vehicle, 'tier'> & {
  tiers: Tier[]
}

type Tier = {
  id: string
  models: number
  points: number
}

export type {
  Character,
  Leader,
  Squad,
  Team,
  Transport,
  Unit,
  Vehicle,
  Warlord
}
