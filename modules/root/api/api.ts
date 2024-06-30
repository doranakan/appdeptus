import { supabaseApi } from 'appdeptus/api'
import { getSession, signIn } from './endpoints'

const rootApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSession: getSession(builder),
    signIn: signIn(builder)
  }),
  overrideExisting: true
})

export default rootApi
