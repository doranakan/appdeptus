import { sessionApi } from 'appdeptus/api'
import { getSession, signIn, signInWithGoogle, signOut } from './endpoints'
import SessionApiTag from './tags'

const rootApi = sessionApi
  .enhanceEndpoints({ addTagTypes: [SessionApiTag.SESSION] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSession: getSession(builder),
      signIn: signIn(builder),
      signInWithGoogle: signInWithGoogle(builder),
      signOut: signOut(builder)
    }),
    overrideExisting: true
  })

export default rootApi
