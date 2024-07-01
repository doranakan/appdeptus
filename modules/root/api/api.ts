import { supabaseApi } from 'appdeptus/api'
import { getSession, signIn, signOut } from './endpoints'

const rootApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSession: getSession(builder),
    signIn: signIn(builder),
    signOut: signOut(builder)
  }),
  overrideExisting: true
})

export default rootApi
