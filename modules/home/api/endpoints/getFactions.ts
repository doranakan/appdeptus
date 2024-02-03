import { SupabaseEndpointBuilder } from 'appdeptus/api'
import { Faction } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { factionsSchema } from '../schemas'
import { Table } from 'appdeptus/utils/supabase'

const getFactions = (builder: SupabaseEndpointBuilder) =>
  builder.query<Faction[], void>({
    queryFn: async () => {
      const { data, error } = await supabase.from(Table.FACTIONS).select()

      if (error) {
        throw { error }
      }

      return { data: factionsSchema.parse(data) }
    }
  })

export default getFactions
