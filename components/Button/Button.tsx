import { FontAwesome5 } from '@expo/vector-icons'
import {
  ButtonText,
  Button as GSButton,
  HStack,
  Text
} from '@gluestack-ui/themed'
import { ActivityIndicator } from 'react-native'

type ButtonProps = (typeof GSButton)['defaultProps'] & {
  iconColor?: string
  iconName?: string
  loading?: boolean
  text?: string
}

const Button = ({
  '$active-bgColor': activeBgColor = '$primary300',
  '$disabled-bgColor': disabledBgColor = '$primary400',
  action = 'primary',
  backgroundColor = '$primary500',
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
    borderRadius={0}
    isDisabled={isDisabled ?? loading}
    gap='$2'
    size={size}
    variant={variant}
    {...props}
  >
    <ButtonContent
      iconColor={iconColor}
      iconName={iconName}
      loading={loading}
      size={size}
      text={text}
    />
  </GSButton>
)

type ButtonContentProps = {
  iconColor?: string
  iconName?: string
  loading?: boolean
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  text?: string
}

const ButtonContent = ({
  iconColor,
  iconName,
  loading,
  size,
  text
}: ButtonContentProps) => {
  if (loading) {
    return <ActivityIndicator color={'white'} />
  }
  return (
    <HStack gap='$1'>
      {text && (
        <ButtonText
          flex={1}
          textAlign={iconName ? 'left' : 'center'}
        >
          {text}
        </ButtonText>
      )}
      {iconName && (
        <Text
          color={iconColor ?? '$textLight0'}
          size={size}
        >
          <FontAwesome5
            name={iconName}
            size={iconSize[size]}
          />
        </Text>
      )}
    </HStack>
  )
}

const iconSize: Record<string, number> = {
  xs: 10,
  sm: 13,
  md: 16,
  lg: 20,
  xl: 24
}

export default Button
