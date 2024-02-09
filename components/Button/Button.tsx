import { FontAwesome5 } from '@expo/vector-icons'
import { ButtonText, Button as GSButton, Text } from '@gluestack-ui/themed'
import React from 'react'
import { ActivityIndicator } from 'react-native'

type ButtonProps = (typeof GSButton)['defaultProps'] & {
  iconColor?: string
  iconName?: string
  loading?: boolean
  text?: string
}

const Button = ({
  '$active-bgColor': activeBgColor = '$info300',
  '$disabled-bgColor': disabledBgColor = '$info400',
  action = 'primary',
  backgroundColor = '$info500',
  iconColor = '$textLight0',
  iconName,
  isDisabled,
  loading,
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
    isDisabled={isDisabled || loading}
    gap={'$2'}
    size={size}
    variant={variant}
    {...props}
  >
    <ButtonContent
      iconColor={iconColor}
      iconName={iconName}
      loading={loading}
      text={text}
    />
  </GSButton>
)

type ButtonContentProps = {
  iconColor?: string
  iconName?: string
  loading?: boolean
  text?: string
}

const ButtonContent = ({
  iconColor,
  iconName,
  loading,
  text
}: ButtonContentProps) => {
  if (loading) {
    return <ActivityIndicator color={iconColor} />
  }
  return (
    <>
      {text && (
        <ButtonText
          flex={1}
          textAlign={iconName ? 'left' : 'center'}
        >
          {text}
        </ButtonText>
      )}
      {iconName && (
        <Text color={iconColor}>
          <FontAwesome5
            name={iconName}
            size={16}
          />
        </Text>
      )}
    </>
  )
}

export default Button
