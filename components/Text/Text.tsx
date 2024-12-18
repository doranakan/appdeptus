import {
  type ComponentProps,
  forwardRef,
  type ForwardRefRenderFunction,
  memo
} from 'react'
import { type Text as RNTextType } from 'react-native'
import { GSText } from '../ui'

type TextProps = ComponentProps<typeof GSText> & {
  family?:
    | 'body-bold'
    | 'body-bold-italic'
    | 'body-medium'
    | 'body-medium-italic'
    | 'body-regular'
    | 'body-regular-italic'
    | 'heading-regular'
}

const Text: ForwardRefRenderFunction<RNTextType, TextProps> = (
  { family = 'body-regular', ...props },
  ref
) => (
  <GSText
    {...props}
    style={{ fontFamily: fontFamilyMap[family] }}
    ref={ref}
  />
)

const fontFamilyMap = {
  'body-bold': 'IBMPlexMono_700Bold',
  'body-bold-italic': 'IBMPlexMono_700Bold_Italic',
  'body-medium': 'IBMPlexMono_500Medium',
  'body-medium-italic': 'IBMPlexMono_500Medium_Italic',
  'body-regular': 'IBMPlexMono_400Regular',
  'body-regular-italic': 'IBMPlexMono_400Regular_Italic',
  'heading-regular': 'Silkscreen_400Regular'
} as const satisfies Record<NonNullable<TextProps['family']>, string>

export default memo(forwardRef(Text))
