import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type CodexName } from 'appdeptus/models'

type DesignSystemSlice = {
  colorMode: 'light' | CodexName
}

const initialState: DesignSystemSlice = {
  colorMode: 'light'
}

const designSystemSlice = createSlice({
  initialState,
  name: 'designSystem',
  reducers: {
    setColorMode: (
      state,
      action: PayloadAction<DesignSystemSlice['colorMode']>
    ) => {
      state.colorMode = action.payload
    }
  }
})

const reducer = designSystemSlice.reducer
const reducerPath = designSystemSlice.reducerPath

export { reducer, reducerPath }

export default designSystemSlice
