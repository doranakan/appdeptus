import { supabaseApi } from 'appdeptus/api'
import {
  createArmy,
  getArmies,
  getArmy,
  getCodexes,
  getCodexUnits,
  getUnitCompositions
} from './endpoints'
import ArmiesApiTag from './tags'

const armiesApi = supabaseApi
  .enhanceEndpoints({
    addTagTypes: [...Object.values(ArmiesApiTag)]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createArmy: createArmy(builder),
      getArmies: getArmies(builder),
      getArmy: getArmy(builder),
      getCodexes: getCodexes(builder),
      getCodexUnits: getCodexUnits(builder),
      getUnitCompositions: getUnitCompositions(builder)
    }),
    overrideExisting: true
  })

export default armiesApi
