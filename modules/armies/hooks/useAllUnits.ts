import { type Army, type Unit } from 'appdeptus/models'
import { useMemo } from 'react'

const useAllUnits = (units: Army['units']) =>
  useMemo(
    () =>
      units.reduce<Unit[]>((acc, curr) => {
        switch (curr.type) {
          case 'carried':
            return [
              ...acc,
              curr.transport,
              ...curr.carried.flatMap((carr) =>
                carr.type === 'team' ? [carr.leader, carr.bodyguard] : carr
              )
            ]

          case 'team':
            return [...acc, curr.leader, curr.bodyguard]

          default:
            return [...acc, curr]
        }
      }, []),
    [units]
  )

export default useAllUnits
