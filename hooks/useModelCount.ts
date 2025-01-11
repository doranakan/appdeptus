import {
  type Army,
  type GameArmy,
  type GameUnit,
  type Unit
} from 'appdeptus/models'
import { useMemo } from 'react'

const calcUnitModelCount = (unit: Unit | GameUnit) =>
  'models' in unit ? unit.models.length : unit.tier.models

const useModelCount = (units: Army['roster'] | GameArmy['roster']) =>
  useMemo(
    () =>
      units.reduce((acc, unit) => {
        switch (unit.type) {
          case 'embarked': {
            return (
              acc +
              calcUnitModelCount(unit.transport) +
              unit.crew.reduce((a, c) => {
                if (c.type === 'team') {
                  return (
                    a +
                    calcUnitModelCount(c.bodyguard) +
                    calcUnitModelCount(c.leader)
                  )
                }
                return a + calcUnitModelCount(c)
              }, 0)
            )
          }

          case 'team':
            return (
              acc +
              calcUnitModelCount(unit.leader) +
              calcUnitModelCount(unit.bodyguard)
            )

          default:
            return acc + calcUnitModelCount(unit)
        }
      }, 0),
    [units]
  )

export default useModelCount
