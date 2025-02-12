import { sessionApi } from 'appdeptus/api'
import {
  deleteUser,
  getSession,
  signIn,
  signInWithApple,
  signInWithGoogle,
  signInWithOAuth,
  signOut,
  signUp
} from './endpoints'
import { sessionApiTags } from './tags'

const rootApi = sessionApi
  .enhanceEndpoints({ addTagTypes: sessionApiTags })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteUser: deleteUser(builder),
      getSession: getSession(builder),
      signIn: signIn(builder),
      signInWithApple: signInWithApple(builder),
      signInWithGoogle: signInWithGoogle(builder),
      signInWithOAuth: signInWithOAuth(builder),
      signOut: signOut(builder),
      signUp: signUp(builder)
    }),
    overrideExisting: true
  })

export default rootApi
