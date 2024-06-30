import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type Codex } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { codexSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getCodex = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Codex, string>({
    queryFn: async (codexId) => {
      const { data, error: codexError } = await supabase
        .from(Table.CODEXES)
        .select()
        .eq('id', codexId)

      if (codexError) {
        throw { error: codexError }
      }

      const codex = codexSchema.parse(data[0])

      return { data: codex }
    }
  })

export default getCodex
