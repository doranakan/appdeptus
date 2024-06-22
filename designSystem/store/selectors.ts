import { type RootState } from 'appdeptus/store/types'

const selectColorMode = (state: RootState) => state.designSystem.colorMode

export { selectColorMode }
