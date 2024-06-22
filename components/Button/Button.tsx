import {
  ButtonSpinner,
  ButtonText,
  Button as GSButton,
  Icon as GSIcon
} from '@gluestack-ui/themed'
import { type LucideIcon } from 'lucide-react-native'
import React, { type ComponentProps } from 'react'

type ButtonProps = Omit<ComponentProps<typeof GSButton>, 'isDisabled'> & {
  disabled?: boolean
  iconSize?: number
  Icon?: LucideIcon
  loading?: boolean
  text?: string
}

const Button = ({
  disabled,
  Icon,
  iconSize = 18,
  loading,
  size,
  text,
  ...props
}: ButtonProps) => (
  <GSButton
    gap='$1'
    isDisabled={disabled ?? loading}
    {...props}
  >
    {loading ? (
      <ButtonSpinner />
    ) : (
      <>
        {text && <ButtonText size={size}>{text}</ButtonText>}
        {Icon && (
          <GSIcon
            as={Icon}
            color={'white'}
            h={iconSize}
            w={iconSize}
          />
        )}
      </>
    )}
  </GSButton>
)

export default Button
