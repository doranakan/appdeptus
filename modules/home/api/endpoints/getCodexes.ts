import { SupabaseEndpointBuilder } from 'appdeptus/api'
import { Codex } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { factionsSchema, codexesSchema } from '../schemas'
import { Table } from 'appdeptus/utils/supabase'

const getCodexes = (builder: SupabaseEndpointBuilder) =>
  builder.query<Codex[], string>({
    queryFn: async (factionId) => {
      const { data: codexesData, error: codexesError } = await supabase
        .from(Table.CODEXES)
        .select()
        .eq('faction', factionId)

      if (codexesError) {
        throw { error: codexesError }
      }

      const { data: factionsData, error: facionsError } = await supabase
        .from(Table.FACTIONS)
        .select()

      if (facionsError) {
        throw { error: facionsError }
      }

      const factions = factionsSchema.parse(factionsData)

      const rawCodexes = codexesSchema.parse(codexesData)

      const codexes: Codex[] = rawCodexes.map((codex) => ({
        id: codex.id,
        name: codex.name,
        faction: factions.find((faction) => faction.id === codex.faction) ?? {
          id: '',
          name: ''
        }
      }))

      return { data: codexes }
    }
  })

export default getCodexes
