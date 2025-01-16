import { type GameArmy, type GameUnit } from 'appdeptus/models'
import { useMemo } from 'react'

const isUnitDestroyed = (unit: GameUnit) =>
  unit.models.filter(({ killed }) => killed).length === unit.models.length
    ? 1
    : 0

const useDestroyedUnitCount = (units: GameArmy['roster']) =>
  useMemo(
    () =>
      units.reduce((acc, unit) => {
        switch (unit.type) {
          case 'embarked': {
            return (
              acc +
              isUnitDestroyed(unit.transport) +
              unit.crew.reduce((a, c) => {
                if (c.type === 'team') {
                  return (
                    a + isUnitDestroyed(c.bodyguard) + isUnitDestroyed(c.leader)
                  )
                }
                return a + isUnitDestroyed(c)
              }, 0)
            )
          }

          case 'team':
            return (
              acc +
              isUnitDestroyed(unit.leader) +
              isUnitDestroyed(unit.bodyguard)
            )

          default:
            return acc + isUnitDestroyed(unit)
        }
      }, 0),
    [units]
  )

export default useDestroyedUnitCount
