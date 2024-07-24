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
import {
  designSystemReducer,
  designSystemReducerPath
} from 'appdeptus/designSystem'

const store = configureStore({
  reducer: {
    [coreApiReducerPath]: coreApiReducer,
    [designSystemReducerPath]: designSystemReducer,
    [sessionApiReducerPath]: sessionApiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(coreApi.middleware)
      .concat(sessionApi.middleware)
})

setupListeners(store.dispatch)

export default store
