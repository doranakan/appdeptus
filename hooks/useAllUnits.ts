import { type Army, type GameArmy } from 'appdeptus/models'
import { mapRosterToUnits } from 'appdeptus/utils'
import { useMemo } from 'react'

const useAllUnits = (units: Army['roster'] | GameArmy['roster']) =>
  useMemo(() => mapRosterToUnits(units), [units])

export default useAllUnits
