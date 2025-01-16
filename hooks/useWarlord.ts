import { type Army, type GameArmy } from 'appdeptus/models'
import { useMemo } from 'react'
import useAllUnits from './useAllUnits'

const useWarlord = (units: Army['roster'] | GameArmy['roster']) => {
  const allUnits = useAllUnits(units)
  return useMemo(() => {
    return allUnits.find(({ warlord }) => warlord)
  }, [allUnits])
}

export default useWarlord
