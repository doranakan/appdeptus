import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { createRef } from 'react'

const gameRef = createRef<BottomSheetModalMethods>()
const modelRef = createRef<BottomSheetModalMethods>()

export { gameRef, modelRef }
