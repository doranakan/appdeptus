import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ArmiesApiTags } from '../tags'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { z } from 'zod'

const unitAttachmentsSchema = z.array(
  z.object({
    attacher: z.number(),
    target: z.number()
  })
)

const getUnitAttachments = (builder: CoreEndpointBuilder<ArmiesApiTags>) =>
  builder.query<Record<number, number[]>, number[]>({
    queryFn: async (attackerIds) => {
      try {
        if (!attackerIds.length) {
          return { data: {} }
        }

        const { data, error } = await supabase
          .from(Table.UNIT_ATTACHMENTS)
          .select('attacher, target')
          .in('attacher', attackerIds)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const rows = unitAttachmentsSchema.parse(data)

        const result = rows.reduce<Record<number, number[]>>((acc, row) => {
          const existing = acc[row.attacher] ?? []
          return { ...acc, [row.attacher]: [...existing, row.target] }
        }, {})

        return { data: result }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getUnitAttachments
