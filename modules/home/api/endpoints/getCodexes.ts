import { SupabaseEndpointBuilder } from 'appdeptus/api'
import { Codex } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { codexesSchema } from '../schemas'

const getCodexes = (builder: SupabaseEndpointBuilder) =>
  builder.query<Codex[], void>({
    queryFn: async () => {
      const { data, error: codexesError } = await supabase
        .from(Table.CODEXES)
        .select()

      if (codexesError) {
        throw { error: codexesError }
      }

      const codexes = codexesSchema.parse(data)

      return { data: sortBy(codexes, ({ name }) => name) }
    }
  })

export default getCodexes
