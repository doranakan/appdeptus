import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  supabaseApi,
  supabaseApiReducer,
  supabaseApiReducerPath
} from 'appdeptus/api'
import {
  designSystemReducer,
  designSystemReducerPath
} from 'appdeptus/designSystem'

const store = configureStore({
  reducer: {
    [designSystemReducerPath]: designSystemReducer,
    [supabaseApiReducerPath]: supabaseApiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware)
})

setupListeners(store.dispatch)

export default store
