type BaseUnit = {
  id: string
  name: string
  upgrades: UnitUpgrade[]
  tier: Tier

  teamId?: string
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
  id: string
  leader: Leader
  bodyguard: Squad
  type: 'team'
}

type Warlord = Character | Leader | Team

type Unit = Character | Leader | Squad | Transport | Vehicle

type SelectableUnit = Omit<Unit, 'tier' | 'teamId'> & {
  tiers: [Tier, ...Tier[]]
}

type Tier = {
  id: string
  models: number
  points: number
}

type UnitUpgrade = {
  id: string
  name: string
  points: number
}

export type {
  Character,
  Leader,
  SelectableUnit,
  Squad,
  Team,
  Transport,
  Unit,
  Vehicle,
  Warlord
}
