import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { createGameSchema } from '../schemas'

const createGame = (builder: SupabaseEndpointBuilder) =>
  builder.mutation<string, string>({
    queryFn: async (armyId) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .insert({
            army_one: armyId
          })
          .select('id')

        if (error) {
          return { error }
        }

        const { id } = await createGameSchema.parseAsync(data[0])

        return { data: id }
      } catch (error) {
        return { error }
      }
    }
  })

export default createGame