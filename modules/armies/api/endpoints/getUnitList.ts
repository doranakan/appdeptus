import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Unit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { unitListSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getUnitList = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Unit[], string>({
    queryFn: async (codexId) => {
      try {
        const { data, error } = await supabase
          .from(Table.UNITS)
          .select(
            `
              id,
              name,
              type,
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

        const units = unitListSchema.parse(mapNullToUndefined(data))

        const sortedUnits = sortBy(units, ({ name }) => name)

        return { data: sortedUnits }
      } catch (error) {
        return { error }
      }
    }
  })

export default getUnitList
