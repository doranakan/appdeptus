import { type ThemeName } from 'appdeptus/components'
import { noop } from 'lodash'
import { createContext, useContext } from 'react'

type Asyncify<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>

type ThemeSwitchContextType = {
  switchTheme: (
    theme: ThemeName,
    tapCoordinates: { x: number, y: number }
  ) => Promise<void>
}

const ThemeSwitchContext = createContext<ThemeSwitchContextType>({
  switchTheme: noop as Asyncify<typeof noop>
})

const useThemeSwitch = () => useContext(ThemeSwitchContext)

export { type ThemeSwitchContextType, useThemeSwitch }
export default ThemeSwitchContext
