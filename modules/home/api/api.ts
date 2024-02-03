import { supabaseApi } from 'appdeptus/api'
import { getCodexes, getFactions } from './endpoints'

const homeApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCodexes: getCodexes(builder),
    getFactions: getFactions(builder)
  }),
  overrideExisting: true
})

export default homeApi
