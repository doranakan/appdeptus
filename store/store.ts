import { combineReducers, configureStore } from '@reduxjs/toolkit'
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
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const reducer = combineReducers({
  [designSystemReducerPath]: designSystemReducer,
  [supabaseApiReducerPath]: persistReducer(persistConfig, supabaseApiReducer)
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(supabaseApi.middleware)
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { persistor }

export default store
