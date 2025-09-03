import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  coreApi,
  coreApiReducer,
  coreApiReducerPath,
  notificationsApi,
  notificationsApiReducer,
  notificationsApiReducerPath,
  sessionApi,
  sessionApiReducer,
  sessionApiReducerPath
} from 'appdeptus/api'
import { themeReducer } from 'appdeptus/components/store'

const store = configureStore({
  reducer: {
    [coreApiReducerPath]: coreApiReducer,
    [notificationsApiReducerPath]: notificationsApiReducer,
    [sessionApiReducerPath]: sessionApiReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(coreApi.middleware)
      .concat(notificationsApi.middleware)
      .concat(sessionApi.middleware)
})

setupListeners(store.dispatch)

export default store
