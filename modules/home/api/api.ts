import { supabaseApi } from 'appdeptus/api'
import { createArmy, getArmies, getCodexes, getCodexUnits } from './endpoints'
import HomeApiTag from './tags'

const homeApi = supabaseApi
  .enhanceEndpoints({
    addTagTypes: [...Object.values(HomeApiTag)]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createArmy: createArmy(builder),
      getArmies: getArmies(builder),
      getCodexes: getCodexes(builder),
      getCodexUnits: getCodexUnits(builder)
    }),
    overrideExisting: true
  })

export default homeApi
