import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type CodexUnit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { tiersSchema, unitsSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getCodexUnits = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<CodexUnit[], string>({
    queryFn: async (codexId) => {
      const { data: unitsData, error: unitsError } = await supabase
        .from(Table.UNITS)
        .select()
        .eq('codex', codexId)

      if (unitsError) {
        throw { error: unitsError }
      }

      const units = unitsSchema.parse(mapNullToUndefined(unitsData))

      const { data: tiersData, error: tiersError } = await supabase
        .from(Table.UNIT_TIERS)
        .select()
        .in(
          'unit',
          units.map(({ id }) => id)
        )

      if (tiersError) {
        throw { error: tiersError }
      }

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

export default getCodexUnits
