import { type UnitUpgrade } from 'appdeptus/models'
import { useMemo } from 'react'

const useGroupedUpgrades = (upgrades: UnitUpgrade[]) =>
  useMemo(
    () =>
      upgrades.reduce<{ upgrade: UnitUpgrade; count: number }[]>((acc, upg) => {
        const existing = acc.find(({ upgrade }) => upgrade.id === upg.id)
        if (existing) {
          existing.count++
        } else {
          acc.push({ upgrade: upg, count: 1 })
        }
        return acc
      }, []),
    [upgrades]
  )

export default useGroupedUpgrades
