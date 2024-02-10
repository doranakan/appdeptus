import { SupabaseEndpointBuilder, getUserId } from 'appdeptus/api'
import { Army } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armiesSchema, codexesSchema } from '../schemas'
import ArmiesApiTag from '../tags'

type GetArmiesResponse = Omit<Army, 'units'>

const getArmies = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<GetArmiesResponse[], void>({
    queryFn: async () => {
      const userId = await getUserId()

      const { data: rawArmies, error: armiesError } = await supabase
        .from(Table.ARMIES)
        .select()
        .eq('userId', userId)

      if (armiesError) {
        throw { error: armiesError }
      }

      const parsedArmies = armiesSchema.parse(rawArmies)

      const { data, error: codexesError } = await supabase
        .from(Table.CODEXES)
        .select()

      if (codexesError) {
        throw { error: codexesError }
      }

      const codexes = codexesSchema.parse(data)

      const armies = parsedArmies.map((army) => {
        const codex = codexes.find((codex) => codex.id === army.codex)

        if (!codex) {
          throw { error: 'Unabled to find this army codex' }
        }

        return {
          id: army.id,
          codex,
          name: army.name,
          totalPoints: army.totalPoints
        }
      })

      return { data: armies }
    },
    providesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default getArmies
