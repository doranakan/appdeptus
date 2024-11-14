import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type NewGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import type GamesApiTag from '../tags'

const deleteGame = (builder: CoreEndpointBuilder<GamesApiTag>) =>
  builder.mutation<null, NewGame['id']>({
    queryFn: async (armyId) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .delete()
          .eq('id', armyId)

        if (error) {
          return { error }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    }
  })

export default deleteGame
