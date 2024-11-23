import { type Army, type Team } from 'appdeptus/models'
import { useMemo } from 'react'

const useUnitCount = (units: Army['roster']) =>
  useMemo(() => {
    const teams = units.filter<Team>(
      (unit): unit is Team => unit.type === 'team'
    )

    return units.length + teams.length
  }, [units])

export default useUnitCount
