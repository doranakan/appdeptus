import { supabaseApi } from 'appdeptus/api'
import {
  createArmy,
  deleteArmy,
  getArmies,
  getArmy,
  getCodexes,
  getCodexUnits,
  getUnitComposition,
  getUnitCompositions,
  updateArmy
} from './endpoints'
import ArmiesApiTag from './tags'

const armiesApi = supabaseApi
  .enhanceEndpoints({
    addTagTypes: [...Object.values(ArmiesApiTag)]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createArmy: createArmy(builder),
      deleteArmy: deleteArmy(builder),
      getArmies: getArmies(builder),
      getArmy: getArmy(builder),
      getCodexes: getCodexes(builder),
      getCodexUnits: getCodexUnits(builder),
      getUnitComposition: getUnitComposition(builder),
      getUnitCompositions: getUnitCompositions(builder),
      updateArmy: updateArmy(builder)
    }),
    overrideExisting: true
  })

export default armiesApi
