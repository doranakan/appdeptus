import { type Action } from '@reduxjs/toolkit'
import { type RootState } from 'appdeptus/store/types'
import { supabase } from 'appdeptus/utils'
import { REHYDRATE } from 'redux-persist'

const getUserId = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw { error }
  }

  return data.user.id
}

const isHydrateAction = (
  action: Action
): action is Action<typeof REHYDRATE> & {
  key: string
  payload: RootState
  err: unknown
} => action.type === REHYDRATE

export { getUserId, isHydrateAction }
