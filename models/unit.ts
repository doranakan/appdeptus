import { type Enhancement } from './detachment'

type BaseUnit = {
  id: number
  name: string
  selectionId: string
  tier: Tier
  upgrades: UnitUpgrade[]

  transportId?: string
  warlord?: boolean
}

type Hero = {
  hero: true
}

type Enhanceable = {
  enhancement?: Enhancement
  hero: false
}

type Character = BaseUnit &
  (Hero | Enhanceable) & {
    type: 'character'
  }

type Leader = BaseUnit &
  (Hero | Enhanceable) & {
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

type Unit = Character | Leader | Squad | Transport | Vehicle

type Team = {
  id: string
  leader: Leader
  bodyguard: Squad
  type: 'team'
}

type Embarked = {
  id: string
  transport: Transport
  crew: (Unit | Team)[]
  type: 'embarked'
}

type SelectableUnit = Omit<Unit, 'selectionId' | 'tier' | 'teamId'> & {
  tiers: [Tier, ...Tier[]]
}

type Tier = {
  id: number
  models: number
  points: number
}

type UnitUpgrade = {
  id: number
  name: string
  points: number
}

export type {
  Character,
  Embarked,
  Enhanceable,
  Leader,
  SelectableUnit,
  Squad,
  Team,
  Transport,
  Unit,
  Vehicle
}
