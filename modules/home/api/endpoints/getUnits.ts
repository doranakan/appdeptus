import { SupabaseEndpointBuilder } from 'appdeptus/api'
import { Unit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tiersSchema, unitsSchema } from '../schemas'

const getUnits = (builder: SupabaseEndpointBuilder) =>
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

      const sortedUnits = unitsWithTiers.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })

      return { data: sortedUnits }
    }
  })

export default getUnits
