import { supabaseApi } from 'appdeptus/api'
import { createArmy, getCodexes, getUnits } from './endpoints'

const homeApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createArmy: createArmy(builder),
    getCodexes: getCodexes(builder),
    getUnits: getUnits(builder)
  }),
  overrideExisting: true
})

export default homeApi
