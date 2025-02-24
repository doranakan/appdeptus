import { type CodexName, type SelectableUnit } from 'appdeptus/models'
import { uniq } from 'lodash'
import { useMemo } from 'react'

const useUnitTypes = (units: SelectableUnit[], codex: CodexName) =>
  useMemo(
    () =>
      uniq(
        units.map(({ type }) => {
          switch (type) {
            case 'leader':
              return 'character'
            case 'transport':
            case 'vehicle':
              return codex === 'Tyranids' || codex === 'Chaos Daemons'
                ? 'monster'
                : 'vehicle'
            case 'squad':
              return 'troop'
            default:
              return type
          }
        })
      ).sort(),
    [codex, units]
  )

export default useUnitTypes
