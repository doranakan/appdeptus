import { memo } from 'react'
import Text from '../Text'

type ScreenSubtitleProps = {
  children: string
}

const ScreenSubtitle = ({ children }: ScreenSubtitleProps) => (
  <Text
    className='uppercase text-primary-200'
    family='body-bold'
    size='lg'
  >
    {children}
  </Text>
)

export default memo(ScreenSubtitle)
