import type store from './store'

type AppDispatch = typeof store.dispatch

type RootState = ReturnType<typeof store.getState>

export type { AppDispatch, RootState }
