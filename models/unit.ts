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

type BaseSupport = CoreUnit &
  (Hero | Enhanceable) & {
    type: 'support'
  }

type BaseSquad = CoreUnit & {
  type: 'squad'
  battleline: boolean
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
  | BaseSupport
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
type Support = BaseSupport & {
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

type Team<
  L extends BaseLeader = Leader,
  S extends BaseSupport = Support,
  B extends BaseSquad = Squad
> =
  | {
      id: string
      type: 'team'
      attachment: 'leader'
      leader: L
      bodyguard: B
    }
  | {
      id: string
      type: 'team'
      attachment: 'support'
      support: S
      bodyguard: B
    }
  | {
      id: string
      type: 'team'
      attachment: 'both'
      leader: L
      support: S
      bodyguard: B
    }

type Embarked<
  TR extends BaseTransport = Transport,
  U extends BaseUnit = Unit,
  TE extends Team<BaseLeader, BaseSupport, BaseSquad> = Team
> = {
  id: string
  transport: TR
  crew: (U | TE)[]
  type: 'embarked'
}

type SelectableUnit = Exclude<BaseUnit, 'selectionId' | 'teamId'> & {
  tiers: [Tier, ...Tier[]]
}

type Tier = {
  id: number
  models: number
  points: number
  pointsSurcharges?: number[]
}

const getCostForPick = (tier: Tier, pickIndex: number): number => {
  if (!tier.pointsSurcharges?.length || pickIndex <= 1) return tier.points
  const surcharge =
    tier.pointsSurcharges[
      Math.min(pickIndex - 2, tier.pointsSurcharges.length - 1)
    ] ?? 0
  return tier.points + surcharge
}

type UnitUpgrade = {
  id: number
  name: string
  points: number
  maxQuantity: number | null
  quantityMode: 'fixed' | 'per-model'
}

type GameStats = {
  models: {
    wounds: number
    killed: boolean
  }[]
  points: Tier['points']
}

type GameUnit = BaseUnit & GameStats

type GameTeam = Team<
  BaseLeader & GameStats,
  BaseSupport & GameStats,
  BaseSquad & GameStats
>

type GameTransport = BaseTransport & GameStats

type GameEmbarked = Embarked<GameTransport, GameUnit, GameTeam>

type HeroUnit = Hero & (BaseCharacter | BaseLeader | BaseSupport)

const getTeamAttachers = <
  L extends BaseLeader,
  S extends BaseSupport,
  B extends BaseSquad
>(
  team: Team<L, S, B>
): (L | S)[] => [
  ...('leader' in team ? [team.leader] : []),
  ...('support' in team ? [team.support] : [])
]

const isHero = (unit: BaseUnit | SelectableUnit): unit is HeroUnit => {
  return (
    (unit.type === 'character' ||
      unit.type === 'leader' ||
      unit.type === 'support') &&
    'hero' in unit &&
    unit.hero
  )
}

export { getCostForPick, getTeamAttachers, isHero }

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
  Support,
  Team,
  Tier,
  Transport,
  Unit,
  UnitUpgrade,
  Vehicle
}
