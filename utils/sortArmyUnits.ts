import { type Unit } from 'appdeptus/models'

const unitTypePriority: Record<Unit['type'], number> = {
  character: 1,
  leader: 1,
  support: 1,
  squad: 2,
  transport: 3,
  vehicle: 3
}

const sortArmyUnits = (units: Unit[]): Unit[] =>
  [...units].sort((a, b) => {
    const aPriority = a.warlord ? 0 : unitTypePriority[a.type]
    const bPriority = b.warlord ? 0 : unitTypePriority[b.type]
    return aPriority - bPriority
  })

export default sortArmyUnits
