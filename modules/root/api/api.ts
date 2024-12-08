import { sessionApi } from 'appdeptus/api'
import { getSession, signIn, signInWithGoogle, signOut } from './endpoints'
import signInWithApple from './endpoints/signInWithApple'
import signUp from './endpoints/signUp'
import SessionApiTag from './tags'

const rootApi = sessionApi
  .enhanceEndpoints({ addTagTypes: [SessionApiTag.SESSION] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSession: getSession(builder),
      signIn: signIn(builder),
      signInWithApple: signInWithApple(builder),
      signInWithGoogle: signInWithGoogle(builder),
      signOut: signOut(builder),
      signUp: signUp(builder)
    }),
    overrideExisting: true
  })

export default rootApi
