type BaseUnit = {
  id: number
  name: string
  selectionId: string
  tier: Tier
  upgrades: UnitUpgrade[]

  teamId?: string
  warlord?: boolean
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

type Unit = Character | Leader | Squad | Transport | Vehicle

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
  Leader,
  SelectableUnit,
  Squad,
  Team,
  Transport,
  Unit,
  Vehicle
}
