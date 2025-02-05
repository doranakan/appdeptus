import { type Unit } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'

type InsertArmyEntriesParams = {
  armyId: number
  units: Unit[]
}

const insertArmyEntries = ({ armyId, units }: InsertArmyEntriesParams) =>
  supabase.from(Table.ARMY_ENTRIES).insert(
    units.map((unit) => ({
      army: armyId,
      unit: unit.id,
      tier: unit.tier.id,
      enhancement:
        'enhancement' in unit && unit.enhancement ? unit.enhancement.id : null
    }))
  )

export { insertArmyEntries }
