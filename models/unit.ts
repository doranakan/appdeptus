import { type Enhancement } from './detachment'

type CoreUnit = {
  id: number
  name: string
  selectionId: string
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

type BaseCharacter = CoreUnit &
  (Hero | Enhanceable) & {
    type: 'character'
  }

type BaseLeader = CoreUnit &
  (Hero | Enhanceable) & {
    type: 'leader'
  }

type BaseSquad = CoreUnit & {
  type: 'squad'
}

type BaseTransport = CoreUnit & {
  type: 'transport'
}

type BaseVehicle = CoreUnit & {
  type: 'vehicle'
}

type BaseUnit =
  | BaseCharacter
  | BaseLeader
  | BaseSquad
  | BaseTransport
  | BaseVehicle

type Unit = BaseUnit & {
  tier: Tier
}
type Character = BaseCharacter & {
  tier: Tier
}
type Leader = BaseLeader & {
  tier: Tier
}
type Squad = BaseSquad & {
  tier: Tier
}
type Transport = BaseTransport & {
  tier: Tier
}
type Vehicle = BaseVehicle & {
  tier: Tier
}

type Team<L extends BaseLeader = Leader, B extends BaseSquad = Squad> = {
  id: string
  leader: L
  bodyguard: B
  type: 'team'
}

type Embarked<
  TR extends BaseTransport = Transport,
  U extends BaseUnit = Unit,
  TE extends Team<BaseLeader, BaseSquad> = Team
> = {
  id: string
  transport: TR
  crew: (U | TE)[]
  type: 'embarked'
}

type SelectableUnit = Omit<BaseUnit, 'selectionId' | 'teamId'> & {
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

type GameStats = {
  models: {
    wounds: number
    killed: boolean
  }[]
  points: Tier['points']
}

type GameUnit = BaseUnit & GameStats

type GameTeam = Team<BaseLeader & GameStats, BaseSquad & GameStats>

type GameTransport = BaseTransport & GameStats

type GameEmbarked = Embarked<GameTransport, GameUnit, GameTeam>

type HeroUnit = Hero & (BaseCharacter | BaseLeader)

const isHero = (unit: BaseUnit | SelectableUnit): unit is HeroUnit => {
  return (
    (unit.type === 'character' || unit.type === 'leader') &&
    'hero' in unit &&
    unit.hero
  )
}

export { isHero }

export type {
  Character,
  Embarked,
  Enhanceable,
  GameEmbarked,
  GameTeam,
  GameUnit,
  Leader,
  SelectableUnit,
  Squad,
  Team,
  Transport,
  Unit,
  Vehicle
}
