import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Codex, type SelectableUnit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { unitListSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getUnitList = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<SelectableUnit[], Codex['id']>({
    queryFn: async (codexId) => {
      try {
        const { data, error } = await supabase
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
          .eq('codex', codexId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const units = unitListSchema.parse(mapNullToUndefined(data))

        const sortedUnits = sortBy(units, ({ name }) => name)

        return { data: sortedUnits }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getUnitList
