import { supabaseApi } from 'appdeptus/api'
import { getCodexes, getUnits } from './endpoints'

const homeApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCodexes: getCodexes(builder),
    getUnits: getUnits(builder)
  }),
  overrideExisting: true
})

export default homeApi
