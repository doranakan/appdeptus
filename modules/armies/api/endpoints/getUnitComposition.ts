import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type UnitComposition } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tierModelsSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getUnitComposition = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<UnitComposition, string>({
    queryFn: async (tierId) => {
      const { data, error } = await supabase
        .from(Table.UNIT_COMPOSITIONS)
        .select(
          `
          unit_tier,
          count,
          model!inner(
            *
          )
        `
        )
        .eq('unit_tier', tierId)

      if (error) {
        throw { error }
      }

      const rawUnitComposition = tierModelsSchema.parse(data)

      const unitComposition = rawUnitComposition.map(({ model, ...rest }) => {
        const { id, name, ...stats } = model

        return {
          ...rest,
          model: {
            id,
            name,
            stats
          }
        }
      })

      return { data: unitComposition }
    }
  })

export default getUnitComposition
