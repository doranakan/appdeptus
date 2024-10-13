import { type ComponentProps } from 'react'
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

const Text = ({ family = 'body-regular', ...props }: TextProps) => (
  <GSText
    {...props}
    style={{ fontFamily: fontFamilyMap[family] }}
  />
)

const fontFamilyMap: Record<NonNullable<TextProps['family']>, string> = {
  'body-bold': 'IBMPlexMono_700Bold',
  'body-bold-italic': 'IBMPlexMono_700Bold_Italic',
  'body-medium': 'IBMPlexMono_500Medium',
  'body-medium-italic': 'IBMPlexMono_500Medium_Italic',
  'body-regular': 'IBMPlexMono_400Regular',
  'body-regular-italic': 'IBMPlexMono_400Regular_Italic',
  'heading-regular': 'Silkscreen_400Regular'
}

export default Text
