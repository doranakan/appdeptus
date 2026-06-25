import { useCallback, useMemo, type PropsWithChildren } from 'react'
import {
  ChangeThemeContext,
  type ChangeThemeContextType
} from './ChangeThemeContext'

// Android intentionally skips the Skia dissolve animation (it flickers/snaps on
// many Android drivers). This variant just applies the theme immediately.
const ChangeTheme = ({ children }: PropsWithChildren) => {
  const changeTheme = useCallback<ChangeThemeContextType['changeTheme']>(
    (applyTheme) => {
      applyTheme()
    },
    []
  )

  const value = useMemo<ChangeThemeContextType>(
    () => ({ changeTheme }),
    [changeTheme]
  )

  return (
    <ChangeThemeContext.Provider value={value}>
      {children}
    </ChangeThemeContext.Provider>
  )
}

export default ChangeTheme
