import { type Team, type Unit } from 'appdeptus/models'
import { useMemo } from 'react'

const useWarlord = (units: (Unit | Team)[]) =>
  useMemo(
    () =>
      units.find((unit) => {
        if (unit.type === 'team') {
          return unit.leader.warlord
        }
        return unit.warlord
      }),
    [units]
  )

export default useWarlord
