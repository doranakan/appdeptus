import {
  ButtonText,
  Button as GSButton,
  Icon as GSIcon
} from '@gluestack-ui/themed'
import { type LucideIcon } from 'lucide-react-native'
import React, { type ComponentProps } from 'react'

type ButtonProps = ComponentProps<typeof GSButton> & {
  iconSize?: number
  Icon?: LucideIcon
  text?: string
}

const Button = ({ Icon, iconSize = 18, size, text, ...props }: ButtonProps) => (
  <GSButton
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
  </GSButton>
)

export default Button
