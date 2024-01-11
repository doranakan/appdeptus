import React from 'react'
import { Button as GSButton, ButtonText } from '@gluestack-ui/themed'

type ButtonProps = (typeof GSButton)['defaultProps'] & {
  text: string
}

const Button = ({
  action = 'primary',
  size = 'lg',
  variant = 'solid',
  text,
  ...props
}: ButtonProps) => (
  <GSButton action={action} size={size} variant={variant} {...props}>
    <ButtonText>{text}</ButtonText>
  </GSButton>
)

export default Button
