import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ArmyBuilder } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'
import { mapArmyBuilderToArmyComposition } from '../utils'

const createArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, ArmyBuilder>({
    queryFn: async (armyBuilder) => {
      try {
        const composition = mapArmyBuilderToArmyComposition(armyBuilder)

        const { codex, name, points } = armyBuilder

        const { data, error: armiesError } = await supabase
          .from(Table.ARMIES)
          .insert({
            codex: codex.id,
            composition,
            name,
            points
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
