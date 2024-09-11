import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import { type ComponentProps } from 'react'
import { type ColorMode } from '../../types'

type ThemeProviderProps = Omit<
  ComponentProps<typeof GluestackUIProvider>,
  'colorMode'
> & {
  colorMode: ColorMode
}

const ThemeProvider = ({ colorMode, ...props }: ThemeProviderProps) => (
  <GluestackUIProvider
    {...props}
    // colorMode={
    //   colorMode as ComponentProps<typeof GluestackUIProvider>['colorMode']
    // }
  />
)

export default ThemeProvider
