import { noop } from 'lodash'
import { createContext, useContext } from 'react'

type ChangeThemeContextType = {
  changeTheme: (applyTheme: () => void) => void
}

const ChangeThemeContext = createContext<ChangeThemeContextType>({
  changeTheme: noop
})

const useChangeThemeContext = () => useContext(ChangeThemeContext)

export {
  ChangeThemeContext,
  useChangeThemeContext,
  type ChangeThemeContextType
}
