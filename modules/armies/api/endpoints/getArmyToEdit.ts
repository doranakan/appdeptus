import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type ArmyForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armyToEditSchema } from '../schemas'
import ArmiesApiTag from '../tags'

const getArmyToEdit = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<ArmyForm, string>({
    queryFn: async (armyId) => {
      const { data: rawArmies, error: armiesError } = await supabase
        .from(Table.ARMIES)
        .select(
          `
          id, 
          name, 
          total_points, 
          units,
          codex
        `
        )
        .eq('id', armyId)

      if (armiesError ?? !rawArmies.length) {
        throw { error: armiesError ?? 'invalid Id' }
      }

      const army = armyToEditSchema.parse(rawArmies[0])

      return {
        data: { ...army, codexId: army.codex }
      }
    },
    providesTags: (_res, _error, armyId) => [
      {
        type: ArmiesApiTag.ARMY_DETAIL,
        id: armyId
      }
    ]
  })

export default getArmyToEdit