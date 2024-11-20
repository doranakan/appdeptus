import { type Army } from 'appdeptus/models'
import { useMemo } from 'react'

const useModelCount = (units: Army['roster']) =>
  useMemo(
    () =>
      units.reduce((acc, unit) => {
        switch (unit.type) {
          case 'embarked':
            return (
              acc +
              unit.transport.tier.models +
              unit.embarked.reduce((a, c) => {
                if (c.type === 'team') {
                  return a + c.bodyguard.tier.models + c.leader.tier.models
                }
                return a + c.tier.models
              }, 0)
            )

          case 'team':
            return acc + unit.leader.tier.models + unit.bodyguard.tier.models

          default:
            return acc + unit.tier.models
        }
      }, 0),
    [units]
  )

export default useModelCount
