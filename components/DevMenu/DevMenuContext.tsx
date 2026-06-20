import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef
} from 'react'
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

type DevMenuContextValue = {
  sheetRef: React.RefObject<BottomSheetModalMethods | null>
}

const DevMenuContext = createContext<DevMenuContextValue | null>(null)

export const DevMenuProvider = ({ children }: PropsWithChildren) => {
  const sheetRef = useRef<BottomSheetModalMethods>(null)

  return (
    <DevMenuContext.Provider value={{ sheetRef }}>
      {children}
    </DevMenuContext.Provider>
  )
}

export const useDevMenu = () => {
  const ctx = useContext(DevMenuContext)
  if (!ctx) throw new Error('useDevMenu must be used within DevMenuProvider')
  return ctx
}
