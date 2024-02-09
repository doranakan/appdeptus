import { supabaseApi } from 'appdeptus/api'
import { createArmy, getArmies, getCodexes, getUnits } from './endpoints'
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
      getUnits: getUnits(builder)
    }),
    overrideExisting: true
  })

export default homeApi
