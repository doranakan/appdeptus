import { type Army } from 'appdeptus/models'
import { useMemo } from 'react'
import useAllUnits from './useAllUnits'

const useWarlord = (units: Army['units']) => {
  const allUnits = useAllUnits(units)
  return useMemo(() => {
    return allUnits.find(({ warlord }) => warlord)
  }, [allUnits])
}

export default useWarlord
