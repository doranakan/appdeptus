import { supabaseApi } from 'appdeptus/api'
import { getFactions } from './endpoints'

const homeApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFactions: getFactions(builder)
  }),
  overrideExisting: true
})

export default homeApi
