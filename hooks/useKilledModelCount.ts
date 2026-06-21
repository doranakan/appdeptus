import { type GameArmy, type GameUnit } from 'appdeptus/models'
import { useMemo } from 'react'

const calcKilledModels = (unit: GameUnit) =>
  unit.models.filter(({ killed }) => killed).length

const useKilledModelCount = (units: GameArmy['roster']) =>
  useMemo(
    () =>
      units.reduce((acc, unit) => {
        switch (unit.type) {
          case 'embarked': {
            return (
              acc +
              calcKilledModels(unit.transport) +
              unit.crew.reduce((a, c) => {
                if (c.type === 'team') {
                  return (
                    a +
                    calcKilledModels(c.bodyguard) +
                    ('leader' in c ? calcKilledModels(c.leader) : 0) +
                    ('support' in c ? calcKilledModels(c.support) : 0)
                  )
                }
                return a + calcKilledModels(c)
              }, 0)
            )
          }

          case 'team':
            return (
              acc +
              ('leader' in unit ? calcKilledModels(unit.leader) : 0) +
              ('support' in unit ? calcKilledModels(unit.support) : 0) +
              calcKilledModels(unit.bodyguard)
            )

          default:
            return acc + calcKilledModels(unit)
        }
      }, 0),
    [units]
  )

export default useKilledModelCount
