import { type Army, type GameArmy, type Team } from 'appdeptus/models'
import { useMemo } from 'react'

const useUnitCount = (units: Army['roster'] | GameArmy['roster']) =>
  useMemo(() => {
    const teams = units.filter<Team>(
      (unit): unit is Team => unit.type === 'team'
    )

    return units.length + teams.length
  }, [units])

export default useUnitCount
