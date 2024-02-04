import { FontAwesome5 } from '@expo/vector-icons'
import { ButtonText, Button as GSButton, Text } from '@gluestack-ui/themed'
import React from 'react'

type ButtonProps = (typeof GSButton)['defaultProps'] & {
  iconColor?: string
  iconName?: string
  text?: string
}

const Button = ({
  '$active-bgColor': activeBgColor = '$info300',
  '$disabled-bgColor': disabledBgColor = '$info400',
  action = 'primary',
  backgroundColor = '$info500',
  iconColor = '$textLight0',
  iconName,
  size = 'md',
  variant = 'solid',
  text,
  ...props
}: ButtonProps) => (
  <GSButton
    $active-bgColor={variant === 'solid' ? activeBgColor : undefined}
    $disabled-bgColor={disabledBgColor}
    action={action}
    backgroundColor={variant === 'solid' ? backgroundColor : undefined}
    gap={'$2'}
    size={size}
    variant={variant}
    {...props}
  >
    {text && (
      <ButtonText flex={1} textAlign={iconName ? 'left' : 'center'}>
        {text}
      </ButtonText>
    )}
    {iconName && (
      <Text color={iconColor}>
        <FontAwesome5 name={iconName} size={16} />
      </Text>
    )}
  </GSButton>
)

export default Button
