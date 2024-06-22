import { useColorMode as useGSColorMode } from '@gluestack-style/react'
import { type CodexName } from 'appdeptus/models'

const useColorMode = useGSColorMode

export default useColorMode as () => 'light' | CodexName
