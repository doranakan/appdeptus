import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Codex, type Detachment } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { detachmentListSchema } from '../schemas'
import type ArmiesApiTag from '../tags'

const getDetachmentList = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Detachment[], Codex['id']>({
    queryFn: async (codexId) => {
      try {
        const { data, error } = await supabase
          .from(Table.DETACHMENTS)
          .select(
            `
              id,
              name, 
              detachment_enhancements(
                id,
                name,
                points
              )
            `
          )
          .eq('codex', codexId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const detachments = detachmentListSchema.parse(data)

        return { data: sortBy(detachments, ({ name }) => name) }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getDetachmentList
