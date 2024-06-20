import { FontAwesome5 } from '@expo/vector-icons'
import { ButtonText, Button as DSButton } from 'appdeptus/designSystem'

type ButtonProps = (typeof DSButton)['defaultProps'] & {
  iconSize?: number
  iconName?: string
  loading?: boolean
  text?: string
}

const Button = ({
  loading,
  iconName,
  iconSize = 18,
  size,
  text,
  ...props
}: ButtonProps) => (
  <DSButton
    gap='$1'
    {...props}
  >
    {text && (
      <ButtonText
        size={size}
        textAlign={iconName ? 'left' : 'center'}
      >
        {text}
      </ButtonText>
    )}
    {iconName && (
      <ButtonText size={size}>
        <FontAwesome5
          name={iconName}
          size={iconSize}
        />
      </ButtonText>
    )}
  </DSButton>
)

export default Button
