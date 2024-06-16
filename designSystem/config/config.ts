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
        primary950: '#160408'
      }
    }
  } as const)
)

export default config
