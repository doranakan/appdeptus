import { Icon as GSIcon } from '@gluestack-ui/themed'
import { ButtonText, Button as DSButton } from 'appdeptus/designSystem'
import { type LucideIcon } from 'lucide-react-native'
import React from 'react'

type ButtonProps = (typeof DSButton)['defaultProps'] & {
  iconSize?: number
  Icon?: LucideIcon
  text?: string
}

const Button = ({ Icon, iconSize = 18, size, text, ...props }: ButtonProps) => (
  <DSButton
    gap='$1'
    {...props}
  >
    {text && <ButtonText size={size}>{text}</ButtonText>}
    {Icon && (
      <GSIcon
        as={Icon}
        color={'white'}
        h={iconSize}
        w={iconSize}
      />
    )}
  </DSButton>
)

export default Button
