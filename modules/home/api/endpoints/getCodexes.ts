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

      return { data: codexesSchema.parse(codexesData) }
    }
  })

export default getCodexes
