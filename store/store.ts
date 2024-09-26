import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  coreApi,
  coreApiReducer,
  coreApiReducerPath,
  sessionApi,
  sessionApiReducer,
  sessionApiReducerPath
} from 'appdeptus/api'

const store = configureStore({
  reducer: {
    [coreApiReducerPath]: coreApiReducer,
    [sessionApiReducerPath]: sessionApiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(coreApi.middleware)
      .concat(sessionApi.middleware)
})

setupListeners(store.dispatch)

export default store
