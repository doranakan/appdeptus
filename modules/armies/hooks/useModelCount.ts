import { type Army } from 'appdeptus/models'
import { useMemo } from 'react'

const useModelCount = (units: Army['units']) =>
  useMemo(
    () =>
      units.reduce((acc, unit) => {
        if (unit.type === 'team') {
          return acc + unit.leader.tier.models + unit.bodyguard.tier.models
        }
        return acc + unit.tier.models
      }, 0),
    [units]
  )

export default useModelCount
