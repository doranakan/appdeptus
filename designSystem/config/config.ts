import { createConfig } from '@gluestack-style/react'
import { config as GSConfig } from '@gluestack-ui/config'
import { merge } from 'lodash'
const config = createConfig(
  merge(GSConfig, {
    tokens: {
      colors: {
        primary50: '#FBE9ED',
        primary100: '#F8D3DB',
        primary200: '#F0A8B8',
        primary300: '#E97C94',
        primary400: '#E15170',
        primary500: '#DA274D',
        primary600: '#AE1E3D',
        primary700: '#83162E',
        primary800: '#570F1F',
        primary900: '#2C070F',
        primary950: '#160408',
        secondary50: '#E4E9F1',
        secondary100: '#C9D3E4',
        secondary200: '#8FA4C6',
        secondary300: '#5979AB',
        secondary400: '#3A5073',
        secondary500: '#1E293B',
        secondary600: '#18212F',
        secondary700: '#131A25',
        secondary800: '#0C1018',
        secondary900: '#07090E',
        secondary950: '#030507'
      }
    }
  } as const)
)

export default config
