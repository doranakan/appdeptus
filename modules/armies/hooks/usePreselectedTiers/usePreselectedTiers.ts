import { skipToken } from '@reduxjs/toolkit/query'
import { type CodexUnit } from 'appdeptus/models'
import { useMemo } from 'react'
import { useGetArmyQuery } from '../../api'

const usePreselectedTiers = (armyId?: string) => {
  const { data: army } = useGetArmyQuery(armyId ?? skipToken)

  return useMemo(() => {
    if (!army) {
      return undefined
    }

    const tiers = army.units.map(({ id, tier }) => [id, tier] as const)

    const preselectedTiers = new Map<CodexUnit['id'], CodexUnit['tiers']>()

    for (const [id, tier] of tiers) {
      const unitTiers = preselectedTiers.get(id)

      if (unitTiers) {
        preselectedTiers.set(id, [...unitTiers, tier])
      } else {
        preselectedTiers.set(id, [tier])
      }
    }

    return preselectedTiers
  }, [army])
}

export default usePreselectedTiers
