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
              id,
              name,
              type,
              hero,
              battleline,
              unit_tiers(
                id,
                models,
                points,
                points_surcharges
              ),
              unit_upgrades(
                id,
                name,
                points,
                max_quantity,
                quantity_mode
              )
            `
          )
          .eq('codex', codex.id)

        if (mainCodexError) {
          return { error: JSON.stringify(mainCodexError) }
        }

        const units = unitListSchema.parse(
          mapNullToUndefined(mainCodexData)
        ) as SelectableUnit[]

        const sortedUnits = sortBy(units, ({ name }) => name)

        return { data: sortedUnits }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getUnitList
