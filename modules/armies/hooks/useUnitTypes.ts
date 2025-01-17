import { type SelectableUnit, type Unit } from 'appdeptus/models'
import { useMemo } from 'react'

const useUnitTypes = (units: SelectableUnit[]) =>
  useMemo(
    () =>
      units
        ?.reduce<Unit['type'][]>((acc, { type }) => {
          if (!acc.includes(type)) {
            return [...acc, type]
          }
          return acc
        }, [])
        .sort(),
    [units]
  )

export default useUnitTypes
