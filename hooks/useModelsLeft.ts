import { type GameArmy, type GameUnit } from 'appdeptus/models'
import { useMemo } from 'react'

const calcModelsLeft = (unit: GameUnit) =>
  unit.models.length - unit.models.filter(({ killed }) => killed).length

const useModelsLeft = (unit: GameArmy['roster'][number]) =>
  useMemo(() => {
    switch (unit.type) {
      case 'embarked': {
        const transportModelsLeft = calcModelsLeft(unit.transport)

        const crewModelsLeft = unit.crew.reduce((acc, u) => {
          switch (u.type) {
            case 'team':
              return (
                acc + calcModelsLeft(u.bodyguard) + calcModelsLeft(u.leader)
              )
            default:
              return acc + calcModelsLeft(u)
          }
        }, 0)

        return transportModelsLeft + crewModelsLeft
      }
      case 'team':
        return calcModelsLeft(unit.bodyguard) + calcModelsLeft(unit.leader)

      default:
        return calcModelsLeft(unit)
    }
  }, [unit])

export default useModelsLeft
