import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type UnitComposition } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { unitCompositionsSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const unitCompositionQuery = async (tierId: string) => {
  try {
    const { data, error } = await supabase
      .from(Table.UNIT_COMPOSITIONS)
      .select(
        `
          id,
          unit_tier,
          count,
          model!inner(
            *
          )
        `
      )
      .eq('unit_tier', tierId)

    if (error) {
      return { error }
    }

    const rawUnitComposition = unitCompositionsSchema.parse(data)

    const unitComposition = rawUnitComposition.map<UnitComposition[0]>(
      ({ model, unit_tier, ...rest }) => {
        const { id, name, ...stats } = model

        return {
          ...rest,
          tierId: unit_tier,
          model: {
            id,
            name,
            stats
          }
        }
      }
    )

    return { data: unitComposition }
  } catch (error) {
    return { error }
  }
}

const getUnitComposition = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<UnitComposition, string>({
    queryFn: unitCompositionQuery
  })

export { unitCompositionQuery }

export default getUnitComposition
