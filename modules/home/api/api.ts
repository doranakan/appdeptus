import { supabaseApi } from 'appdeptus/api'
import { getCodexes, getFactions, getUnits } from './endpoints'

const homeApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCodexes: getCodexes(builder),
    getFactions: getFactions(builder),
    getUnits: getUnits(builder)
  }),
  overrideExisting: true
})

export default homeApi
