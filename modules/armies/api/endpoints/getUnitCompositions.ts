import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type UnitComposition, type UnitTier } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { groupBy } from 'lodash'
import { tierModelsSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getUnitCompositions = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Record<UnitTier['id'], UnitComposition>, string[]>({
    queryFn: async (tierIds) => {
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
        .in('unit_tier', tierIds)

      if (error) {
        throw { error }
      }

      const tierModels = tierModelsSchema.parse(data)

      const unitCompositions: Record<UnitTier['id'], UnitComposition> = groupBy(
        tierModels.map(({ model, ...rest }) => {
          const { id, name, ...stats } = model

          return {
            ...rest,
            model: {
              id,
              name,
              stats
            }
          }
        }),
        'unit_tier'
      )

      return { data: unitCompositions }
    }
  })

export default getUnitCompositions
