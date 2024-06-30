import { type config } from '@gluestack-ui/config'
import { type CodexName } from 'appdeptus/models'

type ColorMode = 'light' | CodexName

type Colors = keyof typeof config.tokens.colors

export type { ColorMode, Colors }
