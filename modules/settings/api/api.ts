import { supabaseApi } from 'appdeptus/api'
import { getUserProfile } from './endpoints'

const settingsApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: getUserProfile(builder)
  }),
  overrideExisting: true
})

export default settingsApi
