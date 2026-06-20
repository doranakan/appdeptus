import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react'
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

type DevMenuContextValue = {
  sheetRef: React.RefObject<BottomSheetModalMethods | null>
  storybookActive: boolean
  launchStorybook: () => void
}

const DevMenuContext = createContext<DevMenuContextValue | null>(null)

export const DevMenuProvider = ({ children }: PropsWithChildren) => {
  const sheetRef = useRef<BottomSheetModalMethods>(null)
  const [storybookActive, setStorybookActive] = useState(false)

  const launchStorybook = useCallback(() => {
    sheetRef.current?.dismiss()
    setStorybookActive(true)
  }, [])

  return (
    <DevMenuContext.Provider value={{ sheetRef, storybookActive, launchStorybook }}>
      {children}
    </DevMenuContext.Provider>
  )
}

export const useDevMenu = () => {
  const ctx = useContext(DevMenuContext)
  if (!ctx) throw new Error('useDevMenu must be used within DevMenuProvider')
  return ctx
}
