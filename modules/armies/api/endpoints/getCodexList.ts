import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Codex } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { codexListSchema } from '../schemas'
import { type ArmiesApiTags } from '../tags'

const getCodexList = (builder: CoreEndpointBuilder<ArmiesApiTags>) =>
  builder.query<Codex[], void>({
    queryFn: async () => {
      try {
        const { data, error: codexesError } = await supabase
          .from(Table.CODEXES)
          .select()

        if (codexesError) {
          return { error: JSON.stringify(codexesError) }
        }

        const codexes = codexListSchema.parse(mapNullToUndefined(data))

        return { data: sortBy(codexes, ({ name }) => name) }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getCodexList
