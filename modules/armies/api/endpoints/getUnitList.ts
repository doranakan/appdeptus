import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Codex, type SelectableUnit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { unitListSchema } from '../schemas'
import { type ArmiesApiTags } from '../tags'

const getUnitList = (builder: CoreEndpointBuilder<ArmiesApiTags>) =>
  builder.query<SelectableUnit[], Codex>({
    queryFn: async (codex) => {
      try {
        const { data: mainCodexData, error: mainCodexError } = await supabase
          .from(Table.UNITS)
          .select(
            `
              *,
              unit_tiers(
                id,
                models,
                points
              ),
              unit_upgrades(
                id,
                name,
                points
              )
            `
          )
          .eq('codex', codex.id)

        if (mainCodexError) {
          return { error: JSON.stringify(mainCodexError) }
        }

        const units = unitListSchema.parse(mapNullToUndefined(mainCodexData))

        if (codex.expansionOf) {
          const { data: baseCodexData, error: baseCodexError } = await supabase
            .from(Table.UNITS)
            .select(
              `
            *,
            unit_tiers(
              id,
              models,
              points
              ),
              unit_upgrades(
                id,
                name,
                points
                )
                `
            )
            .eq('codex', codex.expansionOf)
            .filter('hero', 'not.eq', true)

          if (baseCodexError) {
            return { error: JSON.stringify(baseCodexError) }
          }

          const baseUnits = unitListSchema.parse(
            mapNullToUndefined(baseCodexData)
          )

          units.push(...baseUnits)
        }

        const sortedUnits = sortBy(units, ({ name }) => name)

        return { data: sortedUnits }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getUnitList
