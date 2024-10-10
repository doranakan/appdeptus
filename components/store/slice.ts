import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ThemeName } from './types'

type State = {
  name: ThemeName
}

const initialState: State = {
  name: 'default'
}

const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    resetTheme: (state) => ({
      ...state,
      name: 'default'
    }),
    setTheme: (state, { payload }: PayloadAction<ThemeName>) => ({
      ...state,
      name: payload
    })
  },
  selectors: {
    selectThemeName: (state) => state.name
  }
})

export const { reducer: themeReducer } = themeSlice

export default themeSlice
