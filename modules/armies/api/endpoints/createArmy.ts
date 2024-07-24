/* eslint-disable camelcase */
import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ArmyForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const createArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, ArmyForm>({
    queryFn: async ({ codexId, totalPoints, ...army }) => {
      try {
        const { data, error: armiesError } = await supabase
          .from(Table.ARMIES)
          .insert({
            ...army,
            codex: codexId,
            total_points: totalPoints
          })

        if (armiesError) {
          return { error: armiesError }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default createArmy
