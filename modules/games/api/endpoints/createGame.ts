import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'

const createGame = (builder: SupabaseEndpointBuilder) =>
  builder.mutation<null, string>({
    queryFn: async (armyId) => {
      try {
        const { data, error } = await supabase.from(Table.GAMES).insert({
          army_one: armyId
        })

        if (error) {
          return { error }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    }
  })

export default createGame
