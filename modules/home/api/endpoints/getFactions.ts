import { SupabaseEndpointBuilder } from 'appdeptus/api'
import { Faction } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { factionsSchema } from '../schemas'

const getFactions = (builder: SupabaseEndpointBuilder) =>
  builder.query<Faction[], void>({
    queryFn: async () => {
      const { data, error } = await supabase.from(Table.FACTIONS).select()

      if (error) {
        throw { error }
      }

      const factions = factionsSchema.parse(data)

      return { data: sortBy(factions, ({ name }) => name) }
    }
  })

export default getFactions
