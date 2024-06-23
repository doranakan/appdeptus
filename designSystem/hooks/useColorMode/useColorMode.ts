import { useColorMode as useGSColorMode } from '@gluestack-style/react'
import { type ColorMode } from 'appdeptus/designSystem/types'

const useColorMode = useGSColorMode

export default useColorMode as () => ColorMode
