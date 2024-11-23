import { type Army, type Unit } from 'appdeptus/models'
import { useMemo } from 'react'

const useAllUnits = (units: Army['roster']) =>
  useMemo(
    () =>
      units.reduce<Unit[]>((acc, curr) => {
        switch (curr.type) {
          case 'embarked':
            return [
              ...acc,
              curr.transport,
              ...curr.crew.flatMap((embarked) =>
                embarked.type === 'team'
                  ? [embarked.leader, embarked.bodyguard]
                  : embarked
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
