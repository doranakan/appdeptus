import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Codex } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { codexesSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getCodexes = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Codex[], void>({
    queryFn: async () => {
      try {
        const { data, error: codexesError } = await supabase
          .from(Table.CODEXES)
          .select()

        if (codexesError) {
          return { error: codexesError }
        }

        const codexes = codexesSchema.parse(data)

        return { data: sortBy(codexes, ({ name }) => name) }
      } catch (error) {
        return { error }
      }
    }
  })

export default getCodexes
