import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type CodexUnit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { unitsSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getCodexUnits = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<CodexUnit[], string>({
    queryFn: async (codexId) => {
      try {
        const { data, error } = await supabase
          .from(Table.UNITS)
          .select(
            `
              id,
              name,
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
          return { error }
        }

        const units = unitsSchema.parse(mapNullToUndefined(data))

        const sortedUnits = sortBy(units, ({ name }) => name)

        return { data: sortedUnits }
      } catch (error) {
        return { error }
      }
    }
  })

export default getCodexUnits
