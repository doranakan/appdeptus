import { createConfig } from '@gluestack-style/react'
import { config as GSConfig } from '@gluestack-ui/config'
import { merge } from 'lodash'

const config = createConfig(
  merge(GSConfig, {
    // ------------------ COMPONENTS 🪛🔧🧰
    components: {
      Button: {
        theme: {
          ':disabled': {
            opacity: '$60'
          },
          _text: {
            fontFamily: 'NotoSerif'
          },
          borderRadius: '$0',
          variants: {
            action: {
              negative: {
                _text: {
                  color: '$white'
                },
                bg: '$secondary300',
                ':active': {
                  bg: '$secondary300',
                  opacity: '$80',
                  _text: {
                    color: '$white'
                  }
                }
              }
            }
          }
        }
      },
      Heading: {
        theme: {
          fontFamily: 'Grenze'
        }
      },
      Pressable: {
        theme: {
          ':active': {
            opacity: '$80'
          },
          ':disabled': {
            opacity: '$60'
          }
        }
      },
      Text: {
        theme: {
          fontFamily: 'NotoSerif'
        }
      }
    },
    // ------------------ TOKENS 🟥🟩🟦
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

        secondary50: '#E7ECF3',
        secondary100: '#D3DBE9',
        secondary200: '#A7B8D3',
        secondary300: '#7791BB',
        secondary400: '#506F9F',
        secondary500: '#3A5073',
        secondary600: '#2E405C',
        secondary700: '#222F44',
        secondary800: '#18212F',
        secondary900: '#0C1018',
        secondary950: '#05070A'
      }
    }
  } as const)
)
export default config
