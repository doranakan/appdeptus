import { memo } from 'react'
import Text from '../Text'

type ScreenTitleProps = {
  children: string
  className?: string
}

const ScreenTitle = ({ children, className }: ScreenTitleProps) => (
  <Text
    family='heading-regular'
    size='4xl'
    numberOfLines={1}
    className={className}
    adjustsFontSizeToFit
  >
    {children}
  </Text>
)

export default memo(ScreenTitle)
