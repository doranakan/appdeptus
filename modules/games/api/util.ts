import { type Army, type GameArmy, type Unit } from 'appdeptus/models'

const mapUnitToGameUnit = <T extends Unit>(unit: T) => ({
  ...unit,
  models: Array.from({
    length: unit.tier.models
  }).map(() => ({
    killed: false,
    wounds: 0
  })),
  points: unit.tier.points
})

const mapArmyToGameArmy = (roster: Army['roster']): GameArmy['roster'] =>
  roster.map((item) => {
    switch (item.type) {
      case 'embarked': {
        return {
          ...item,
          transport: mapUnitToGameUnit(item.transport),
          crew: item.crew.map((crewItem) => {
            switch (crewItem.type) {
              case 'team':
                return {
                  ...crewItem,
                  bodyguard: mapUnitToGameUnit(crewItem.bodyguard),
                  leader: mapUnitToGameUnit(crewItem.leader)
                }

              default:
                return mapUnitToGameUnit(crewItem)
            }
          })
        } satisfies GameArmy['roster'][number]
      }

      case 'team':
        return {
          ...item,
          bodyguard: mapUnitToGameUnit(item.bodyguard),
          leader: mapUnitToGameUnit(item.leader)
        }
      default:
        return mapUnitToGameUnit(item)
    }
  })

export { mapArmyToGameArmy, mapUnitToGameUnit }
