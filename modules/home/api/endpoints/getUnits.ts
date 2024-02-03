import { SupabaseEndpointBuilder } from 'appdeptus/api'
import { Unit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { unitSchema } from '../schemas'
import { Table } from 'appdeptus/utils/supabase'

const getUnits = (builder: SupabaseEndpointBuilder) =>
  builder.query<Unit[], string>({
    queryFn: async (codexId) => {
      const { data, error } = await supabase
        .from(Table.UNITS)
        .select()
        .eq('codex', codexId)

      if (error) {
        throw { error }
      }

      const units = unitSchema.parse(mapNullToUndefined(data))

      const sortedUnits = units.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })

      return { data: sortedUnits }
    }
  })

export default getUnits
