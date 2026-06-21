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
                switch (crewItem.attachment) {
                  case 'leader':
                    return { ...crewItem, bodyguard: mapUnitToGameUnit(crewItem.bodyguard), leader: mapUnitToGameUnit(crewItem.leader) }
                  case 'support':
                    return { ...crewItem, bodyguard: mapUnitToGameUnit(crewItem.bodyguard), support: mapUnitToGameUnit(crewItem.support) }
                  case 'both':
                    return { ...crewItem, bodyguard: mapUnitToGameUnit(crewItem.bodyguard), leader: mapUnitToGameUnit(crewItem.leader), support: mapUnitToGameUnit(crewItem.support) }
                }

              default:
                return mapUnitToGameUnit(crewItem)
            }
          })
        } satisfies GameArmy['roster'][number]
      }

      case 'team':
        switch (item.attachment) {
          case 'leader':
            return { ...item, bodyguard: mapUnitToGameUnit(item.bodyguard), leader: mapUnitToGameUnit(item.leader) } satisfies GameArmy['roster'][number]
          case 'support':
            return { ...item, bodyguard: mapUnitToGameUnit(item.bodyguard), support: mapUnitToGameUnit(item.support) } satisfies GameArmy['roster'][number]
          case 'both':
            return { ...item, bodyguard: mapUnitToGameUnit(item.bodyguard), leader: mapUnitToGameUnit(item.leader), support: mapUnitToGameUnit(item.support) } satisfies GameArmy['roster'][number]
        }
      default:
        return mapUnitToGameUnit(item)
    }
  })

export { mapArmyToGameArmy, mapUnitToGameUnit }
