import { supabaseApi } from 'appdeptus/api'
import { getUserProfile } from './endpoints'

const userApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: getUserProfile(builder)
  }),
  overrideExisting: true
})

export default userApi
