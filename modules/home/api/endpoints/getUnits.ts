import { SupabaseEndpointBuilder } from 'appdeptus/api'
import { Unit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { tiersSchema, unitsSchema } from '../schemas'
import HomeApiTag from '../tags'

const getUnits = (builder: SupabaseEndpointBuilder<HomeApiTag>) =>
  builder.query<Unit[], string>({
    queryFn: async (codexId) => {
      const { data: unitsData, error: unitsError } = await supabase
        .from(Table.UNITS)
        .select()
        .eq('codex', codexId)

      if (unitsError) {
        throw { error: unitsError }
      }

      const { data: tiersData, error: tiersError } = await supabase
        .from(Table.UNIT_TIERS)
        .select()

      if (tiersError) {
        throw { error: tiersError }
      }

      const units = unitsSchema.parse(mapNullToUndefined(unitsData))

      const tiers = tiersSchema.parse(tiersData)

      const unitsWithTiers = units.map((unit) => {
        const unitTiers = tiers
          .filter((tier) => tier.unit === unit.id)
          .map((tier) => ({ id: tier.id, points: tier.points }))
        return {
          ...unit,
          tiers: unitTiers
        }
      })

      const sortedUnits = sortBy(unitsWithTiers, ({ name }) => name)

      return { data: sortedUnits }
    }
  })

export default getUnits
